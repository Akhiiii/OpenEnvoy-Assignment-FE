import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { StatsCard } from './StatsCard';

// Simple icon for testing
const TestIcon = <span data-testid="test-icon">Icon</span>;

describe('StatsCard Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 3: Trend Indicator Direction
   * Validates: Requirements 3.5, 3.6
   * 
   * For any Stats Card with a trend value, if the trend is positive (> 0),
   * an upward arrow should be displayed; if the trend is negative (< 0),
   * a downward arrow should be displayed.
   */
  it('Property 3: Trend Indicator Direction - positive trends show upward arrow, negative trends show downward arrow', () => {
    // Generate non-zero trend values (positive and negative)
    const trendArbitrary = fc.integer({ min: -100, max: 100 }).filter(n => n !== 0);

    fc.assert(
      fc.property(trendArbitrary, (trend) => {
        const { unmount } = render(
          <StatsCard
            title="Test Card"
            value={1000}
            trend={trend}
            icon={TestIcon}
          />
        );

        const trendIndicator = screen.getByTestId('trend-indicator');
        expect(trendIndicator).toBeTruthy();

        if (trend > 0) {
          // Positive trend should show upward arrow
          const upArrow = screen.getByTestId('trend-arrow-up');
          expect(upArrow).toBeTruthy();
          expect(upArrow.textContent).toBe('↑');
          
          // Should not show down arrow
          expect(screen.queryByTestId('trend-arrow-down')).toBeNull();
          
          // Should have trendUp class
          expect(trendIndicator.className).toMatch(/trendUp/);
        } else if (trend < 0) {
          // Negative trend should show downward arrow
          const downArrow = screen.getByTestId('trend-arrow-down');
          expect(downArrow).toBeTruthy();
          expect(downArrow.textContent).toBe('↓');
          
          // Should not show up arrow
          expect(screen.queryByTestId('trend-arrow-up')).toBeNull();
          
          // Should have trendDown class
          expect(trendIndicator.className).toMatch(/trendDown/);
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
