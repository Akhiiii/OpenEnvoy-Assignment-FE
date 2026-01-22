import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { Table, type ColumnDef } from './Table';

interface TestData extends Record<string, unknown> {
  id: string;
  name: string;
  value: number;
}

describe('Table Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 15: Table Structure Consistency
   * Validates: Requirements 8.4
   * 
   * For any table state (loading, error, empty, or loaded), the table header
   * with column names should remain visible and properly structured.
   */
  it('Property 15: Table Structure Consistency - headers remain visible for any table state', () => {
    // Generate arbitrary column definitions
    const columnArbitrary = fc.record({
      key: fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
      header: fc.string({ minLength: 1, maxLength: 50 }),
    });

    const columnsArbitrary = fc.array(columnArbitrary, { minLength: 1, maxLength: 10 });

    // Generate arbitrary data rows
    const dataRowArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      value: fc.integer({ min: 0, max: 1000 }),
    });

    const dataArbitrary = fc.array(dataRowArbitrary, { minLength: 0, maxLength: 20 });

    // Generate arbitrary table state
    const tableStateArbitrary = fc.oneof(
      fc.constant({ loading: false, error: null, hasData: true }),
      fc.constant({ loading: true, error: null, hasData: false }),
      fc.constant({ loading: false, error: 'Test error message', hasData: false }),
      fc.constant({ loading: false, error: null, hasData: false })
    );

    fc.assert(
      fc.property(
        columnsArbitrary,
        dataArbitrary,
        tableStateArbitrary,
        (columns, data, state) => {
          const testColumns: ColumnDef<TestData>[] = columns.map(col => ({
            key: col.key,
            header: col.header,
          }));

          const testData: TestData[] = state.hasData ? data : [];

          const { container } = render(
            <Table
              columns={testColumns as ColumnDef<Record<string, unknown>>[]}
              data={testData}
              loading={state.loading}
              error={state.error}
            />
          );

          // Verify table structure exists
          const table = container.querySelector('table');
          expect(table).not.toBeNull();

          // Verify thead exists
          const thead = container.querySelector('thead');
          expect(thead).not.toBeNull();

          // Verify all column headers are present
          const headerCells = container.querySelectorAll('th');
          expect(headerCells.length).toBe(columns.length);

          // Verify each header text matches
          columns.forEach((col, index) => {
            expect(headerCells[index].textContent).toBe(col.header);
          });

          // Verify tbody exists
          const tbody = container.querySelector('tbody');
          expect(tbody).not.toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
