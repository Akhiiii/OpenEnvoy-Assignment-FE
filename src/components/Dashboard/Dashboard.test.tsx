import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { MockDataService } from '../../services/MockDataService';
import type { Customer, StatsData } from '../../types';

// Create a mock data service that doesn't simulate delay
const createTestDataService = (options?: {
  customers?: Customer[];
  stats?: StatsData;
  shouldError?: boolean;
}) => {
  const service = new MockDataService(false); // No delay
  
  if (options?.shouldError) {
    vi.spyOn(service, 'getCustomers').mockRejectedValue(new Error('Failed to load data'));
    vi.spyOn(service, 'getStats').mockRejectedValue(new Error('Failed to load data'));
  } else if (options?.customers || options?.stats) {
    if (options.customers) {
      vi.spyOn(service, 'getCustomers').mockResolvedValue({
        data: options.customers,
        total: options.customers.length,
      });
    }
    if (options.stats) {
      vi.spyOn(service, 'getStats').mockResolvedValue(options.stats);
    }
  }
  
  return service;
};

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

  /**
   * Test Dashboard renders all major sections
   * Requirements: 1.1, 2.1, 3.1, 4.1
   */
  it('renders all major sections: Sidebar, TopBar, StatsStrip, CustomerTable', async () => {
    const service = createTestDataService({
      customers: mockCustomers,
      stats: mockStats,
    });

    render(<Dashboard dataService={service} />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check Sidebar is rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    // Check TopBar is rendered with greeting
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
    expect(screen.getByTestId('greeting')).toBeInTheDocument();

    // Check StatsStrip is rendered
    expect(screen.getByTestId('stats-strip')).toBeInTheDocument();

    // Check CustomerTable is rendered with header
    expect(screen.getByRole('heading', { name: 'All Customers' })).toBeInTheDocument();
  });

  /**
   * Test loading state propagates to table
   * Requirements: 8.1
   */
  it('shows loading state while data is being fetched', async () => {
    // Create a service that will take time to resolve
    const service = new MockDataService(false);
    
    // Create promises that we can control
    const customersPromise = new Promise<{ data: Customer[]; total: number }>((resolve) => {
      setTimeout(() => resolve({ data: mockCustomers, total: mockCustomers.length }), 100);
    });
    const statsPromise = new Promise<StatsData>((resolve) => {
      setTimeout(() => resolve(mockStats), 100);
    });

    vi.spyOn(service, 'getCustomers').mockReturnValue(customersPromise);
    vi.spyOn(service, 'getStats').mockReturnValue(statsPromise);

    render(<Dashboard dataService={service} />);

    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  /**
   * Test error state displays error message
   * Requirements: 8.3
   */
  it('displays error message when data fetch fails', async () => {
    const service = createTestDataService({ shouldError: true });

    render(<Dashboard dataService={service} />);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });
  });

  /**
   * Test Dashboard renders with custom user name
   * Requirements: 2.1
   */
  it('displays personalized greeting with user name', async () => {
    const service = createTestDataService({
      customers: mockCustomers,
      stats: mockStats,
    });

    render(<Dashboard dataService={service} userName="Alice" />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Hello Alice/)).toBeInTheDocument();
  });

  /**
   * Test Sidebar shows Customers as active by default
   * Requirements: 1.3
   */
  it('shows Customers navigation item as active by default', async () => {
    const service = createTestDataService({
      customers: mockCustomers,
      stats: mockStats,
    });

    render(<Dashboard dataService={service} />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const customersNavItem = screen.getByTestId('nav-item-customers');
    expect(customersNavItem).toHaveAttribute('aria-current', 'page');
  });
});
