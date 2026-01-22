import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCustomerData } from './useCustomerData';

const mockCustomersResponse = {
  customers: [
    {
      id: '1',
      name: 'John Doe',
      company: 'Acme Corp',
      phone: '(555) 123-4567',
      email: 'john@acme.com',
      country: 'USA',
      status: 'Active',
      createdAt: '2024-01-15T00:00:00.000Z',
    },
  ],
  stats: {
    totalCustomers: { count: 100, trend: 16 },
    members: { count: 80, trend: -1 },
    activeNow: { count: 25, avatars: ['https://example.com/avatar1.jpg'] },
  },
};

describe('useCustomerData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns loading state initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch;

    const { result } = renderHook(() => useCustomerData());

    expect(result.current.loading).toBe(true);
    expect(result.current.customers).toEqual([]);
    expect(result.current.stats).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches and returns customer data successfully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCustomersResponse),
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useCustomerData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customers).toHaveLength(1);
    expect(result.current.customers[0].name).toBe('John Doe');
    expect(result.current.stats).toEqual(mockCustomersResponse.stats);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useCustomerData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('HTTP error! status: 500');
    expect(result.current.customers).toEqual([]);
  });

  it('handles network error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as unknown as typeof fetch;

    const { result } = renderHook(() => useCustomerData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
  });
});
