import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import type { NavItem } from './Sidebar';

const mockUser = {
  name: 'Test User',
  role: 'Tester',
  avatar: 'https://example.com/avatar.png',
};

describe('Sidebar Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 1: Navigation Active State
   * Validates: Requirements 1.2
   * 
   * For any navigation item, when that item is selected, it should be rendered
   * with an active state class or styling applied.
   */
  it('Property 1: Navigation Active State - active state is applied for any selected navigation item', () => {
    const navItemArbitrary = fc.constantFrom<NavItem>(
      'Dashboard',
      'Product',
      'Customers',
      'Income',
      'Promote',
      'Help'
    );

    fc.assert(
      fc.property(navItemArbitrary, (activeItem) => {
        // Clean up before each render to avoid duplicate elements
        cleanup();
        
        render(
          <Sidebar activeItem={activeItem} user={mockUser} />
        );

        // Find the button for the active item
        const activeButton = screen.getByTestId(`nav-item-${activeItem.toLowerCase()}`);
        
        // Verify the active button has the active class
        expect(activeButton.className).toMatch(/active/i);
        expect(activeButton.getAttribute('aria-current')).toBe('page');

        // Verify all other buttons do NOT have the active class
        const allNavItems: NavItem[] = ['Dashboard', 'Product', 'Customers', 'Income', 'Promote', 'Help'];
        const inactiveItems = allNavItems.filter(item => item !== activeItem);

        inactiveItems.forEach(item => {
          const button = screen.getByTestId(`nav-item-${item.toLowerCase()}`);
          // The button should not have the active class pattern
          // CSS modules add a hash, so we check that it doesn't have 'active' in the class
          const hasActiveClass = button.className.includes('active');
          expect(hasActiveClass).toBe(false);
          expect(button.getAttribute('aria-current')).toBeNull();
        });
      }),
      { numRuns: 100 }
    );
  });
});
