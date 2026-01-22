import React, { useState, useMemo, useCallback } from 'react';
import { Table } from '../Table';
import type { ColumnDef } from '../Table';
import { SearchInput } from '../SearchInput';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { StatusBadge } from '../StatusBadge';
import type { Customer } from '../../types';
import styles from './CustomerTable.module.css';

export interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const PAGE_SIZE = 8;
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Name', value: 'name' },
  { label: 'Status', value: 'status' },
];

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  loading = false,
  error = null,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'status'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(
      c =>
        c.name.toLowerCase().includes(term) ||
        c.company.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  const sortedCustomers = useMemo(() => {
    const sorted = [...filteredCustomers];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'status':
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return sorted;
    }
  }, [filteredCustomers, sortBy]);

  const totalItems = sortedCustomers.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedCustomers.slice(start, start + PAGE_SIZE);
  }, [sortedCustomers, currentPage]);

  const startEntry = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(currentPage * PAGE_SIZE, totalItems);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as 'newest' | 'name' | 'status');
  }, []);

  const columns: ColumnDef<Customer>[] = useMemo(
    () => [
      { key: 'name', header: 'Customer Name', render: (_, row) => row.name },
      { key: 'company', header: 'Company', render: (_, row) => row.company },
      { key: 'phone', header: 'Phone Number', render: (_, row) => row.phone },
      { key: 'email', header: 'Email', render: (_, row) => row.email },
      { key: 'country', header: 'Country', render: (_, row) => row.country },
      { key: 'status', header: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
    ],
    []
  );

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');
  const emptyMessage = customers?.length === 0
    ? 'No data found'
    : 'No customers match your search. Try different keywords.';

  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div>
            <h2 className={styles.title}>All Customers</h2>
            <a href="#active-members" className={styles.activeLink}>Active Members</a>
          </div>
        </div>
        <div className={styles.headerRight}>
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className={styles.search}
          />
          <Dropdown
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
            label="Sort by:"
            className={styles.sortDropdown}
          />
        </div>
      </div>

      <Table<Customer>
        columns={columns}
        data={paginatedCustomers}
        loading={loading}
        error={error}
        emptyMessage={emptyMessage}
        className={styles.table}
      />

      <div className={styles.footer}>
        <span className={styles.footerText} data-testid="pagination-footer">
          Showing data {startEntry} to {endEntry} of {totalItems} entries
        </span>
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className={styles.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerTable;
