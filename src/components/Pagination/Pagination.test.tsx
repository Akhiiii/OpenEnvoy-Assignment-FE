import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  /**
   * Requirements: 7.7, 7.8
   */

  it('prev button disabled on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
      />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('next button disabled on last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={() => {}}
      />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('clicking page number calls onPageChange', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const page3Button = screen.getByLabelText('Page 3');
    fireEvent.click(page3Button);
    
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('clicking current page does not call onPageChange', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const currentPageButton = screen.getByLabelText('Page 3');
    fireEvent.click(currentPageButton);
    
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('prev button not disabled when not on first page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={() => {}}
      />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).not.toBeDisabled();
  });

  it('next button not disabled when not on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={() => {}}
      />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).not.toBeDisabled();
  });
});
