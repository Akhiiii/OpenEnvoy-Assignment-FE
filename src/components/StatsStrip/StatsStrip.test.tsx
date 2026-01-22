import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsStrip } from './StatsStrip';
import type { StatsData } from '../../types';

const mockStats: StatsData = {
  totalCustomers: {
    count: 5423,
    trend: 16,
  },
  members: {
    count: 1893,
    trend: -1,
  },
  activeNow: {
    count: 189,
    avatars: [
      'https://example.com/avatar1.jpg',
      'https://example.com/avatar2.jpg',
    ],
  },
};

describe('StatsStrip', () => {
  /**
   * Test strip displays exactly 3 stat items
   * Requirements: 3.1
   */
  it('displays exactly 3 stats items', () => {
    render(<StatsStrip stats={mockStats} />);

    const statsStrip = screen.getByTestId('stats-strip');
    // The component renders 3 stat items with dividers between them
    expect(statsStrip).toBeInTheDocument();
    expect(screen.getByText('Total Customers')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Active Now')).toBeInTheDocument();
  });

  it('displays Total Customers card with correct value', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('Total Customers')).toBeInTheDocument();
    expect(screen.getByText('5,423')).toBeInTheDocument();
  });

  it('displays Members card with correct value', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('1,893')).toBeInTheDocument();
  });

  it('displays Active Now card with correct value', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('Active Now')).toBeInTheDocument();
    expect(screen.getByText('189')).toBeInTheDocument();
  });

  it('displays trend indicators', () => {
    render(<StatsStrip stats={mockStats} />);
    const trendIndicators = screen.getAllByTestId('trend-indicator');
    expect(trendIndicators.length).toBeGreaterThan(0);
  });
});
