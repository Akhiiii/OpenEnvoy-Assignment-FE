import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import * as useCustomerDataModule from '../../hooks/useCustomerData';
import type { Customer, StatsData } from '../../types';

// Mock the useCustomerData hook
vi.mock('../../hooks/useCustomerData');

const mockStats: StatsData = {
  totalCustomers: { count: 100, trend: 16 },
  members: { count: 80, trend: -1 },
  activeNow: { count: 25, avatars: ['https://example.com/avatar1.jpg'] },
};

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Acme Corp',
    phone: '(555) 123-4567',
    email: 'john@acme.com',
    country: 'USA',
    status: 'Active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Tech Inc',
    phone: '(555) 987-6543',
    email: 'jane@tech.com',
    country: 'Canada',
    status: 'Inactive',
    createdAt: new Date('2024-01-10'),
  },
];

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all major sections: Sidebar, TopBar, StatsStrip, CustomerTable', () => {
    vi.mocked(useCustomerDataModule.useCustomerData).mockReturnValue({
      customers: mockCustomers,
      stats: mockStats,
      loading: false,
      error: null,
    });

    render(<Dashboard />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
    expect(screen.getByTestId('greeting')).toBeInTheDocument();
    expect(screen.getByTestId('stats-strip')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'All Customers' })).toBeInTheDocument();
  });

  it('shows loading state while data is being fetched', () => {
    vi.mocked(useCustomerDataModule.useCustomerData).mockReturnValue({
      customers: [],
      stats: null,
      loading: true,
      error: null,
    });

    render(<Dashboard />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when data fetch fails', () => {
    vi.mocked(useCustomerDataModule.useCustomerData).mockReturnValue({
      customers: [],
      stats: null,
      loading: false,
      error: 'Failed to load data',
    });

    render(<Dashboard />);

    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  it('displays personalized greeting with user name', () => {
    vi.mocked(useCustomerDataModule.useCustomerData).mockReturnValue({
      customers: mockCustomers,
      stats: mockStats,
      loading: false,
      error: null,
    });

    render(<Dashboard userName="Alice" />);

    expect(screen.getByText(/Hello Alice/)).toBeInTheDocument();
  });

  it('shows Customers navigation item as active by default', () => {
    vi.mocked(useCustomerDataModule.useCustomerData).mockReturnValue({
      customers: mockCustomers,
      stats: mockStats,
      loading: false,
      error: null,
    });

    render(<Dashboard />);

    const customersNavItem = screen.getByTestId('nav-item-customers');
    expect(customersNavItem).toHaveAttribute('aria-current', 'page');
  });
});
