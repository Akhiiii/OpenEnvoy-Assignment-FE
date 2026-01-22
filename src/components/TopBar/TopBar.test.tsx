import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('includes a search input', () => {
    render(<TopBar userName="Test User" />);
    
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays the greeting with the user name', () => {
    render(<TopBar userName="Evano" />);
    
    const greeting = screen.getByTestId('greeting');
    expect(greeting).toHaveTextContent('Hello Evano 👋🏼,');
  });

  it('calls onSearch when search input changes', async () => {
    const handleSearch = vi.fn();
    render(<TopBar userName="Test User" onSearch={handleSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    // SearchInput has debouncing, so we need to wait
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('test query');
    }, { timeout: 500 });
  });
});
