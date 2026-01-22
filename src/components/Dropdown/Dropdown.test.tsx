import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const options = [
  { label: 'Newest', value: 'newest' },
  { label: 'Name', value: 'name' },
  { label: 'Status', value: 'status' },
];

describe('Dropdown', () => {
  it('calls onChange with selected value', () => {
    const handleChange = vi.fn();
    render(<Dropdown value="newest" options={options} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name' } });
    
    expect(handleChange).toHaveBeenCalledWith('name');
  });

  it('renders all options', () => {
    render(<Dropdown value="newest" options={options} onChange={vi.fn()} />);
    
    expect(screen.getByRole('option', { name: 'Newest' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Status' })).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Dropdown value="newest" options={options} onChange={vi.fn()} label="Sort by:" />);
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('shows correct selected value', () => {
    render(<Dropdown value="name" options={options} onChange={vi.fn()} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('name');
  });
});
