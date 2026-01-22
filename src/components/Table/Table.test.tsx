import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table, type ColumnDef } from './Table';

interface TestData extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
}

const testColumns: ColumnDef<TestData>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
];

const testData: TestData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

describe('Table Component', () => {
  /**
   * Requirements: 8.1, 8.2, 8.3
   */
  
  it('renders correct number of rows', () => {
    render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={testData}
      />
    );

    // Should have 3 data rows
    const rows = screen.getAllByRole('row');
    // 1 header row + 3 data rows = 4 total
    expect(rows.length).toBe(4);
  });

  it('loading state shows spinner', () => {
    const { container } = render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={[]}
        loading={true}
      />
    );

    // Check for loading state container with role="status"
    const loadingState = container.querySelector('[role="status"]');
    expect(loadingState).not.toBeNull();

    // Check for spinner element (aria-hidden for decorative spinner)
    const spinner = container.querySelector('[aria-hidden="true"]');
    expect(spinner).not.toBeNull();

    // Check for loading text
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('empty state shows message', () => {
    render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={[]}
        emptyMessage="No customers found"
      />
    );

    expect(screen.getByText('No customers found')).toBeInTheDocument();
  });

  it('error state shows error message', () => {
    const errorMessage = 'Unable to load customers. Please try again.';
    render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={[]}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders default empty message when no custom message provided', () => {
    render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={[]}
      />
    );

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders column headers correctly', () => {
    render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={testData}
      />
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders cell data correctly', () => {
    render(
      <Table
        columns={testColumns as ColumnDef<Record<string, unknown>>[]}
        data={testData}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
