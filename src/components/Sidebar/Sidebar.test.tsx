import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';

const mockUser = {
  name: 'Evano',
  role: 'Project Manager',
  avatar: 'https://example.com/avatar.png',
};

describe('Sidebar', () => {
  it('displays all 6 navigation items', () => {
    render(<Sidebar user={mockUser} />);
    
    expect(screen.getByTestId('nav-item-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-product')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-customers')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-income')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-promote')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-help')).toBeInTheDocument();
  });

  it('displays Customers as active by default', () => {
    render(<Sidebar user={mockUser} />);
    
    const customersButton = screen.getByTestId('nav-item-customers');
    expect(customersButton.className).toMatch(/active/i);
    expect(customersButton.getAttribute('aria-current')).toBe('page');
  });

  it('displays user profile at bottom with avatar and name', () => {
    render(<Sidebar user={mockUser} />);
    
    const userProfile = screen.getByTestId('user-profile');
    expect(userProfile).toBeInTheDocument();
    
    // Check avatar
    const avatar = screen.getByAltText("Evano's avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUser.avatar);
    
    // Check name
    expect(screen.getByText('Evano')).toBeInTheDocument();
    
    // Check role
    expect(screen.getByText('Project Manager')).toBeInTheDocument();
  });

  it('displays icons alongside each navigation label', () => {
    render(<Sidebar user={mockUser} />);
    
    // Each nav item should have an icon (svg) and a label
    const navItems = ['Dashboard', 'Product', 'Customers', 'Income', 'Promote', 'Help'];
    
    navItems.forEach(item => {
      const button = screen.getByTestId(`nav-item-${item.toLowerCase()}`);
      // Check that the button contains an SVG (icon)
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Check that the label text is present
      expect(button).toHaveTextContent(item);
    });
  });

  it('calls onNavigate when the active navigation item is clicked', () => {
    const handleNavigate = vi.fn();
    // Render with Customers as active (default)
    render(<Sidebar user={mockUser} onNavigate={handleNavigate} />);
    
    // Click the active item (Customers) - only active items are clickable
    fireEvent.click(screen.getByTestId('nav-item-customers'));
    expect(handleNavigate).toHaveBeenCalledWith('Customers');
  });

  it('highlights the correct item when activeItem prop changes', () => {
    const { rerender } = render(<Sidebar user={mockUser} activeItem="Dashboard" />);
    
    expect(screen.getByTestId('nav-item-dashboard').className).toMatch(/active/i);
    expect(screen.getByTestId('nav-item-customers').className).not.toMatch(/active/i);
    
    rerender(<Sidebar user={mockUser} activeItem="Income" />);
    
    expect(screen.getByTestId('nav-item-income').className).toMatch(/active/i);
    expect(screen.getByTestId('nav-item-dashboard').className).not.toMatch(/active/i);
  });
});
