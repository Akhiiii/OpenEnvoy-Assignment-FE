import React from 'react';
import styles from './Table.module.css';

export interface ColumnDef<T = object> {
  key: string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T = object> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends object = object>({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = 'No data found',
  className,
}: TableProps<T>) {
  const tableClasses = [styles.tableContainer, className || ''].filter(Boolean).join(' ');

  const renderContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={columns.length} className={styles.stateCell}>
            <div className={styles.loadingState} role="status" aria-live="polite">
              <div className={styles.spinner} aria-hidden="true" />
              <span>Loading...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={columns.length} className={styles.stateCell}>
            <div className={styles.errorState} role="alert">
              <span className={styles.errorIcon} aria-hidden="true">⚠</span>
              <span>{error}</span>
            </div>
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className={styles.stateCell}>
            <div className={styles.emptyState} role="status">
              <span>{emptyMessage}</span>
            </div>
          </td>
        </tr>
      );
    }

    return data.map((row, rowIndex) => (
      <tr key={rowIndex} className={styles.row}>
        {columns.map((column) => {
          const value = (row as Record<string, unknown>)[column.key];
          return (
            <td key={column.key} className={styles.cell}>
              {column.render ? column.render(value, row) : String(value ?? '')}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className={tableClasses} role="region" aria-label="Data table">
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={styles.headerCell} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>{renderContent()}</tbody>
      </table>
    </div>
  );
}

export default Table;
