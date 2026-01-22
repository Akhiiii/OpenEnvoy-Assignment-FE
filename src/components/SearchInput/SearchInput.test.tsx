import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('debounces input - onChange is called after debounce delay', async () => {
    const handleChange = vi.fn();
    render(<SearchInput onChange={handleChange} debounceMs={100} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    // onChange should not be called immediately with the new value
    expect(handleChange).toHaveBeenCalledTimes(1); // Initial call with empty string
    
    // Wait for debounce
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('test');
    }, { timeout: 200 });
  });

  it('renders with placeholder', () => {
    render(<SearchInput onChange={vi.fn()} placeholder="Search customers..." />);
    expect(screen.getByPlaceholderText('Search customers...')).toBeInTheDocument();
  });

  it('renders search icon', () => {
    const { container } = render(<SearchInput onChange={vi.fn()} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
