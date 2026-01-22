// Core type definitions for Customers Dashboard

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
}

export interface StatsData {
  totalCustomers: {
    count: number;
    trend: number; // percentage, positive or negative
  };
  members: {
    count: number;
    trend: number;
  };
  activeNow: {
    count: number;
    avatars: string[]; // URLs to avatar images
  };
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface TableFilters {
  searchTerm: string;
  sortBy: 'newest' | 'name' | 'status';
}

