import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomerTable } from './CustomerTable';
import type { Customer } from '../../types';

// Helper to create mock customers
const createMockCustomer = (overrides: Partial<Customer> = {}): Customer => ({
  id: `customer-${Math.random().toString(36).substr(2, 9)}`,
  name: 'John Doe',
  company: 'Acme Corp',
  phone: '+1-555-0100',
  email: 'john@acme.com',
  country: 'USA',
  status: 'Active',
  createdAt: new Date('2024-01-15'),
  ...overrides,
});

const createMockCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockCustomer({
      id: `customer-${i}`,
      name: `Customer ${i + 1}`,
      company: `Company ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      createdAt: new Date(2024, 0, count - i), // Newest first
    })
  );
};

describe('CustomerTable', () => {
  /**
   * Test table displays correct columns
   * Requirements: 4.1, 4.2
   */
  it('displays all 6 columns: Customer Name, Company, Phone Number, Email, Country, Status', () => {
    const customers = createMockCustomers(5);
    const { container } = render(<CustomerTable customers={customers} />);

    // Check all column headers are present in the thead
    const headerCells = container.querySelectorAll('thead th');
    const headerTexts = Array.from(headerCells).map(cell => cell.textContent);
    
    expect(headerTexts).toContain('Customer Name');
    expect(headerTexts).toContain('Company');
    expect(headerTexts).toContain('Phone Number');
    expect(headerTexts).toContain('Email');
    expect(headerTexts).toContain('Country');
    expect(headerTexts).toContain('Status');
    expect(headerTexts.length).toBe(6);
  });

  /**
   * Test empty search returns all records
   * Requirements: 5.6
   */
  it('displays all records when search is empty', () => {
    const customers = createMockCustomers(5);
    render(<CustomerTable customers={customers} />);

    // All 5 customers should be displayed
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Customer 2')).toBeInTheDocument();
    expect(screen.getByText('Customer 3')).toBeInTheDocument();
    expect(screen.getByText('Customer 4')).toBeInTheDocument();
    expect(screen.getByText('Customer 5')).toBeInTheDocument();
  });

  /**
   * Test default sort is "Newest"
   * Requirements: 6.2
   */
  it('defaults to "Newest" sort order', () => {
    const customers = createMockCustomers(3);
    render(<CustomerTable customers={customers} />);

    // Check the dropdown shows "Newest" as selected
    const sortDropdown = screen.getByRole('combobox', { name: /sort by/i });
    expect(sortDropdown).toHaveValue('newest');
  });

  /**
   * Test header displays "All Customers" title
   * Requirements: 4.1
   */
  it('displays "All Customers" header title', () => {
    const customers = createMockCustomers(3);
    render(<CustomerTable customers={customers} />);

    expect(screen.getByRole('heading', { name: 'All Customers' })).toBeInTheDocument();
  });

  /**
   * Test header displays "Active Members" link
   * Requirements: 4.1
   */
  it('displays "Active Members" link in header', () => {
    const customers = createMockCustomers(3);
    render(<CustomerTable customers={customers} />);

    expect(screen.getByRole('link', { name: 'Active Members' })).toBeInTheDocument();
  });

  /**
   * Test loading state
   * Requirements: 8.1
   */
  it('displays loading state when loading prop is true', () => {
    render(<CustomerTable customers={[]} loading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  /**
   * Test error state
   * Requirements: 8.3
   */
  it('displays error message when error prop is provided', () => {
    render(<CustomerTable customers={[]} error="Failed to load customers" />);

    expect(screen.getByText('Failed to load customers')).toBeInTheDocument();
  });

  /**
   * Test empty state
   * Requirements: 8.2
   */
  it('displays empty message when no customers exist', () => {
    render(<CustomerTable customers={[]} />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  /**
   * Test pagination footer format
   * Requirements: 4.6
   */
  it('displays correct pagination footer format', () => {
    const customers = createMockCustomers(20);
    render(<CustomerTable customers={customers} />);

    // First page with 20 total items, showing 8 per page
    expect(screen.getByTestId('pagination-footer')).toHaveTextContent(
      'Showing data 1 to 8 of 20 entries'
    );
  });
});
