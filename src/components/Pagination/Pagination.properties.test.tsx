import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 11: Current Page Highlighting
   * Validates: Requirements 7.2
   * 
   * For any current page, that page number should be visually highlighted
   * (different styling) in the pagination controls.
   */
  it('Property 11: Current Page Highlighting - current page is visually highlighted', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 100 }),
        (currentPage, totalPages) => {
          cleanup();
          
          // Ensure currentPage is within valid range
          const validCurrentPage = Math.min(currentPage, totalPages);
          const validTotalPages = Math.max(totalPages, 1);

          const { container } = render(
            <Pagination
              currentPage={validCurrentPage}
              totalPages={validTotalPages}
              onPageChange={() => {}}
            />
          );

          // Find the button with aria-current="page"
          const activeButton = container.querySelector('[aria-current="page"]');
          
          // There should be exactly one active page
          expect(activeButton).not.toBeNull();
          
          // The active button should contain the current page number
          expect(activeButton?.textContent).toBe(String(validCurrentPage));
          
          // The active button should have the 'active' class
          expect(activeButton?.className).toMatch(/active/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: customers-dashboard, Property 12: Page Navigation
   * Validates: Requirements 7.4
   * 
   * For any valid page number N within the range [1, totalPages], clicking
   * that page number should call onPageChange with that page number.
   */
  it('Property 12: Page Navigation - clicking page number calls onPageChange correctly', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        fc.integer({ min: 1, max: 20 }),
        (currentPage, totalPages) => {
          cleanup();
          
          const validTotalPages = Math.max(totalPages, 1);
          const validCurrentPage = Math.min(currentPage, validTotalPages);
          
          const onPageChange = vi.fn();

          const { container } = render(
            <Pagination
              currentPage={validCurrentPage}
              totalPages={validTotalPages}
              onPageChange={onPageChange}
            />
          );

          // Find all page buttons (not nav buttons)
          const pageButtons = container.querySelectorAll('button[aria-label^="Page"]');
          
          // Click each visible page button
          pageButtons.forEach((button) => {
            const pageNum = parseInt(button.textContent || '0', 10);
            if (pageNum !== validCurrentPage && pageNum > 0) {
              fireEvent.click(button);
              expect(onPageChange).toHaveBeenCalledWith(pageNum);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: customers-dashboard, Property 13: Sequential Page Navigation
   * Validates: Requirements 7.5, 7.6
   * 
   * For any current page P where 1 < P < totalPages, clicking next should
   * navigate to page P+1, and clicking previous should navigate to page P-1.
   */
  it('Property 13: Sequential Page Navigation - next/previous buttons navigate correctly', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 99 }),
        fc.integer({ min: 3, max: 100 }),
        (currentPage, totalPages) => {
          cleanup();
          
          // Ensure currentPage is in the middle (not first or last)
          const validTotalPages = Math.max(totalPages, 3);
          const validCurrentPage = Math.min(Math.max(currentPage, 2), validTotalPages - 1);
          
          const onPageChange = vi.fn();

          const { container } = render(
            <Pagination
              currentPage={validCurrentPage}
              totalPages={validTotalPages}
              onPageChange={onPageChange}
            />
          );

          // Test next button using container query
          const nextButton = container.querySelector('[aria-label="Next page"]');
          expect(nextButton).not.toBeNull();
          fireEvent.click(nextButton!);
          expect(onPageChange).toHaveBeenCalledWith(validCurrentPage + 1);

          onPageChange.mockClear();

          // Test previous button using container query
          const prevButton = container.querySelector('[aria-label="Previous page"]');
          expect(prevButton).not.toBeNull();
          fireEvent.click(prevButton!);
          expect(onPageChange).toHaveBeenCalledWith(validCurrentPage - 1);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: customers-dashboard, Property 14: Ellipsis Display
   * Validates: Requirements 7.9
   * 
   * For any pagination state where totalPages > maxVisiblePages, ellipsis (...)
   * should appear between non-consecutive page number ranges.
   */
  it('Property 14: Ellipsis Display - ellipsis appears when totalPages exceeds maxVisiblePages', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }),
        fc.integer({ min: 10, max: 50 }),
        fc.integer({ min: 3, max: 7 }),
        (currentPage, totalPages, maxVisiblePages) => {
          cleanup();
          
          const validTotalPages = Math.max(totalPages, maxVisiblePages + 1);
          const validCurrentPage = Math.min(Math.max(currentPage, 1), validTotalPages);
          
          const { container } = render(
            <Pagination
              currentPage={validCurrentPage}
              totalPages={validTotalPages}
              onPageChange={() => {}}
              maxVisiblePages={maxVisiblePages}
            />
          );

          // When totalPages > maxVisiblePages, there should be ellipsis
          const ellipsisElements = container.querySelectorAll('span');
          const hasEllipsis = Array.from(ellipsisElements).some(
            el => el.textContent === '...'
          );

          // If we're not near the start or end, there should be ellipsis
          // At minimum, if totalPages > maxVisiblePages, ellipsis should appear
          // when current page is in the middle
          if (validCurrentPage > 3 && validCurrentPage < validTotalPages - 2) {
            expect(hasEllipsis).toBe(true);
          }

          // Verify page numbers are not all consecutive when ellipsis is shown
          if (hasEllipsis) {
            const pageButtons = container.querySelectorAll('button[aria-label^="Page"]');
            const pageNumbers = Array.from(pageButtons)
              .map(btn => parseInt(btn.textContent || '0', 10))
              .filter(n => n > 0);
            
            // Check that there's a gap in page numbers (indicating ellipsis)
            let hasGap = false;
            for (let i = 1; i < pageNumbers.length; i++) {
              if (pageNumbers[i] - pageNumbers[i - 1] > 1) {
                hasGap = true;
                break;
              }
            }
            expect(hasGap).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
