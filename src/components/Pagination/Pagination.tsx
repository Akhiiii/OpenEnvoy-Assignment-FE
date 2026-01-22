import React from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
}) => {
  const containerClasses = [styles.pagination, className || ''].filter(Boolean).join(' ');

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible range
    let start = Math.max(2, currentPage - halfVisible);
    let end = Math.min(totalPages - 1, currentPage + halfVisible);

    // Adjust if we're near the beginning
    if (currentPage <= halfVisible + 1) {
      end = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - halfVisible) {
      start = Math.max(2, totalPages - maxVisiblePages + 2);
    }

    // Add ellipsis before middle pages if needed
    if (start > 2) {
      pages.push('ellipsis');
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis after middle pages if needed
    if (end < totalPages - 1) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <nav className={containerClasses} aria-label="Pagination">
      <button
        className={`${styles.navButton} ${isPrevDisabled ? styles.disabled : ''}`}
        onClick={handlePrevious}
        disabled={isPrevDisabled}
        aria-label="Previous page"
      >
        <span className={styles.chevron}>‹</span>
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
              onClick={() => handlePageClick(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={`${styles.navButton} ${isNextDisabled ? styles.disabled : ''}`}
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label="Next page"
      >
        <span className={styles.chevron}>›</span>
      </button>
    </nav>
  );
};

export default Pagination;
