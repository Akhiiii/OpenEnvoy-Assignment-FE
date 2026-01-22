import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsCard } from './StatsCard';

// Simple icon for testing
const TestIcon = <span data-testid="test-icon">Icon</span>;

describe('StatsCard', () => {
  /**
   * Test card displays title and value
   * Requirements: 3.2, 3.3
   */
  it('displays title and value', () => {
    render(
      <StatsCard
        title="Total Customers"
        value={5423}
        icon={TestIcon}
      />
    );

    expect(screen.getByText('Total Customers')).toBeTruthy();
    expect(screen.getByTestId('stats-value').textContent).toBe('5,423');
  });

  /**
   * Test card displays avatars when provided
   * Requirements: 3.4
   */
  it('displays avatars when provided', () => {
    const avatars = [
      'https://example.com/avatar1.jpg',
      'https://example.com/avatar2.jpg',
      'https://example.com/avatar3.jpg',
    ];

    render(
      <StatsCard
        title="Active Now"
        value={189}
        icon={TestIcon}
        avatars={avatars}
      />
    );

    const avatarsContainer = screen.getByTestId('avatars-container');
    expect(avatarsContainer).toBeTruthy();
    
    const avatarImages = avatarsContainer.querySelectorAll('img');
    expect(avatarImages.length).toBe(3);
  });

  /**
   * Test card displays icon
   * Requirements: 3.7
   */
  it('displays icon', () => {
    render(
      <StatsCard
        title="Members"
        value={1893}
        icon={TestIcon}
      />
    );

    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toBeTruthy();
    expect(screen.getByTestId('test-icon')).toBeTruthy();
  });

  it('does not display avatars when not provided', () => {
    render(
      <StatsCard
        title="Total Customers"
        value={5423}
        icon={TestIcon}
      />
    );

    expect(screen.queryByTestId('avatars-container')).toBeNull();
  });

  it('does not display trend indicator when trend is not provided', () => {
    render(
      <StatsCard
        title="Total Customers"
        value={5423}
        icon={TestIcon}
      />
    );

    expect(screen.queryByTestId('trend-indicator')).toBeNull();
  });

  it('limits avatars to 5 maximum', () => {
    const avatars = [
      'https://example.com/avatar1.jpg',
      'https://example.com/avatar2.jpg',
      'https://example.com/avatar3.jpg',
      'https://example.com/avatar4.jpg',
      'https://example.com/avatar5.jpg',
      'https://example.com/avatar6.jpg',
      'https://example.com/avatar7.jpg',
    ];

    render(
      <StatsCard
        title="Active Now"
        value={189}
        icon={TestIcon}
        avatars={avatars}
      />
    );

    const avatarsContainer = screen.getByTestId('avatars-container');
    const avatarImages = avatarsContainer.querySelectorAll('img');
    expect(avatarImages.length).toBe(5);
  });
});
