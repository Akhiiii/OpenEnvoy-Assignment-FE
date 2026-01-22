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
   * Test strip displays exactly 4 cards
   * Requirements: 3.1
   */
  it('displays exactly 4 stats cards', () => {
    render(<StatsStrip stats={mockStats} />);

    const statsCards = screen.getAllByTestId('stats-card');
    expect(statsCards.length).toBe(4);
  });

  it('displays Total Customers card', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('Total Customers')).toBeTruthy();
  });

  it('displays Members card', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('Members')).toBeTruthy();
  });

  it('displays Active Now card', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('Active Now')).toBeTruthy();
  });

  it('displays New This Month card', () => {
    render(<StatsStrip stats={mockStats} />);
    expect(screen.getByText('New This Month')).toBeTruthy();
  });
});
