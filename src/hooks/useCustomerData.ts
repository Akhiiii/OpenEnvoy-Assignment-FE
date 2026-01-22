import { useState, useEffect } from 'react';
import type { Customer, StatsData } from '../types';

/**
 * Custom hook for fetching customer data from JSON file
 * 
 * WHY THIS APPROACH?
 * - Separation of concerns: Data fetching logic is isolated from UI components
 * - Reusability: This hook can be used in any component that needs customer data
 * - Testability: Easy to mock for unit tests
 * - Clean code: Dashboard component stays focused on rendering
 */

interface CustomerDataState {
  customers: Customer[];
  stats: StatsData | null;
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = "/data/customers.json";

// interface UseCustomerDataReturn extends CustomerDataState {
//   refetch: () => void;
// }

export function useCustomerData(): CustomerDataState {
  const [state, setState] = useState<CustomerDataState>({
    customers: [],
    stats: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch data from JSON file in public folder
      const response = await fetch(API_ENDPOINT);
      
      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform date strings to Date objects
      const customers: Customer[] = data.customers.map((customer: Customer & { createdAt: string }) => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
      }));

      setState({
        customers,
        stats: data.stats,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load data',
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    ...state,
    // refetch: fetchData,
  };
}
