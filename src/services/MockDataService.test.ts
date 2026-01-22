import { describe, it, expect } from 'vitest';
import { MockDataService } from './MockDataService';

describe('MockDataService Unit Tests', () => {
  /**
   * Requirements: 9.1
   * Test that service generates at least 256 customers
   */
  it('should generate at least 256 customers', () => {
    const service = new MockDataService(false);
    const customers = service.getCustomersSync();
    
    expect(customers.length).toBeGreaterThanOrEqual(256);
  });

  /**
   * Requirements: 9.1
   * Test empty search returns all customers
   */
  it('should return all customers when search is empty', async () => {
    const service = new MockDataService(false);
    const allCustomers = service.getCustomersSync();
    
    const result = await service.getCustomers(
      { searchTerm: '', sortBy: 'newest' },
      { currentPage: 1, pageSize: 1000, totalItems: allCustomers.length, totalPages: 1 }
    );
    
    expect(result.total).toBe(allCustomers.length);
  });

  /**
   * Requirements: 9.1
   * Test stats calculation returns correct structure
   */
  it('should return stats with correct structure', async () => {
    const service = new MockDataService(false);
    const stats = await service.getStats();
    
    // Verify totalCustomers structure
    expect(stats.totalCustomers).toBeDefined();
    expect(typeof stats.totalCustomers.count).toBe('number');
    expect(typeof stats.totalCustomers.trend).toBe('number');
    
    // Verify members structure
    expect(stats.members).toBeDefined();
    expect(typeof stats.members.count).toBe('number');
    expect(typeof stats.members.trend).toBe('number');
    
    // Verify activeNow structure
    expect(stats.activeNow).toBeDefined();
    expect(typeof stats.activeNow.count).toBe('number');
    expect(Array.isArray(stats.activeNow.avatars)).toBe(true);
  });

  /**
   * Requirements: 9.2
   * Test that generated customers have realistic data
   */
  it('should generate customers with all required fields', () => {
    const service = new MockDataService(false);
    const customers = service.getCustomersSync();
    
    for (const customer of customers.slice(0, 10)) {
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.company).toBeDefined();
      expect(customer.phone).toBeDefined();
      expect(customer.email).toBeDefined();
      expect(customer.country).toBeDefined();
      expect(['Active', 'Inactive']).toContain(customer.status);
      expect(customer.createdAt).toBeInstanceOf(Date);
    }
  });
});
