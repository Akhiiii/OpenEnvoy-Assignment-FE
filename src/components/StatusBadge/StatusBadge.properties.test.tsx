import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { StatusBadge, type CustomerStatus } from './StatusBadge';

describe('StatusBadge Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 5: Status Badge Rendering
   * Validates: Requirements 4.4, 4.5
   * 
   * For any customer status, if the status is "Active", the badge should render
   * with green styling; if the status is "Inactive", the badge should render
   * with red styling.
   */
  it('Property 5: Status Badge Rendering - correct badge color is rendered for any customer status', () => {
    const statusArbitrary = fc.constantFrom<CustomerStatus>('Active', 'Inactive');

    fc.assert(
      fc.property(statusArbitrary, (status) => {
        const { container } = render(<StatusBadge status={status} />);
        const badge = container.querySelector('span');
        
        expect(badge).not.toBeNull();
        expect(badge?.textContent).toBe(status);
        expect(badge?.getAttribute('data-status')).toBe(status);
        
        // Check that the correct CSS class is applied
        const classList = badge?.className || '';
        
        if (status === 'Active') {
          // Active status should have the 'active' class (green styling)
          expect(classList).toMatch(/active/i);
          expect(classList).not.toMatch(/inactive/i);
        } else {
          // Inactive status should have the 'inactive' class (red styling)
          expect(classList).toMatch(/inactive/i);
        }
      }),
      { numRuns: 100 }
    );
  });
});
