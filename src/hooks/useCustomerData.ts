import { useState, useEffect } from 'react';
import type { Customer, StatsData } from '../types';

interface CustomerDataState {
  customers: Customer[];
  stats: StatsData | null;
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = '/data/customers.json';

export function useCustomerData(): CustomerDataState {
  const [state, setState] = useState<CustomerDataState>({
    customers: [],
    stats: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const customers: Customer[] = data.customers.map(
          (customer: Customer & { createdAt: string }) => ({
            ...customer,
            createdAt: new Date(customer.createdAt),
          })
        );

        setState({ customers, stats: data.stats, loading: false, error: null });
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load data',
        }));
      }
    };

    fetchData();
  }, []);

  return state;
}
