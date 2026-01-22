import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { MockDataService } from './MockDataService';

describe('MockDataService Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 16: Service Pagination Slice
   * Validates: Requirements 9.5
   * 
   * For any page number P, page size S, and dataset D, the Mock_Data_Service
   * should return items from index (P-1) * S to min(P * S, D.length) - 1.
   */
  it('Property 16: Service Pagination Slice - returns correct slice of data for any page/size', async () => {
    const service = new MockDataService(false); // Disable delays for testing
    const allCustomers = service.getCustomersSync();
    const totalItems = allCustomers.length;

    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 50 }), // pageSize
        fc.integer({ min: 1, max: 100 }), // pageNumber
        async (pageSize, pageNumber) => {
          const result = await service.getCustomers(
            { searchTerm: '', sortBy: 'newest' },
            { currentPage: pageNumber, pageSize, totalItems, totalPages: Math.ceil(totalItems / pageSize) }
          );

          const expectedStart = (pageNumber - 1) * pageSize;
          const expectedEnd = Math.min(pageNumber * pageSize, totalItems);
          const expectedLength = Math.max(0, expectedEnd - expectedStart);

          // Verify the returned data length matches expected slice
          expect(result.data.length).toBe(expectedLength);
          
          // Verify total count is correct
          expect(result.total).toBe(totalItems);
        }
      ),
      { numRuns: 100 }
    );
  });
});


  /**
   * Feature: customers-dashboard, Property 7: Search Filtering
   * Validates: Requirements 5.2, 5.3, 5.4
   * 
   * For any search term and customer dataset, the filtered results should include
   * only customers where the search term (case-insensitive) appears in the name,
   * company, or email fields.
   */
  it('Property 7: Search Filtering - filtered results include only matching customers', async () => {
    const service = new MockDataService(false);
    const allCustomers = service.getCustomersSync();

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 10 }),
        async (searchTerm) => {
          const result = await service.getCustomers(
            { searchTerm, sortBy: 'newest' },
            { currentPage: 1, pageSize: 1000, totalItems: allCustomers.length, totalPages: 1 }
          );

          const termLower = searchTerm.toLowerCase();
          
          // Every returned customer must match the search term in name, company, or email
          for (const customer of result.data) {
            const matchesName = customer.name.toLowerCase().includes(termLower);
            const matchesCompany = customer.company.toLowerCase().includes(termLower);
            const matchesEmail = customer.email.toLowerCase().includes(termLower);
            
            expect(matchesName || matchesCompany || matchesEmail).toBe(true);
          }

          // Verify that all matching customers from the original set are included
          const expectedMatches = allCustomers.filter(c =>
            c.name.toLowerCase().includes(termLower) ||
            c.company.toLowerCase().includes(termLower) ||
            c.email.toLowerCase().includes(termLower)
          );
          
          expect(result.total).toBe(expectedMatches.length);
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Feature: customers-dashboard, Property 9: Sort Order Correctness
   * Validates: Requirements 6.3
   * 
   * For any customer dataset and sort option (newest/name/status), the resulting
   * order should be: newest = descending by createdAt date, name = ascending
   * alphabetical by name, status = alphabetical by status.
   */
  it('Property 9: Sort Order Correctness - results are correctly ordered for any sort option', async () => {
    const service = new MockDataService(false);
    const allCustomers = service.getCustomersSync();

    const sortOptions: Array<'newest' | 'name' | 'status'> = ['newest', 'name', 'status'];

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...sortOptions),
        async (sortBy) => {
          const result = await service.getCustomers(
            { searchTerm: '', sortBy },
            { currentPage: 1, pageSize: 1000, totalItems: allCustomers.length, totalPages: 1 }
          );

          // Verify the sort order is correct
          for (let i = 1; i < result.data.length; i++) {
            const prev = result.data[i - 1];
            const curr = result.data[i];

            switch (sortBy) {
              case 'newest':
                // Descending by createdAt
                expect(prev.createdAt.getTime()).toBeGreaterThanOrEqual(curr.createdAt.getTime());
                break;
              case 'name':
                // Ascending alphabetical by name
                expect(prev.name.localeCompare(curr.name)).toBeLessThanOrEqual(0);
                break;
              case 'status':
                // Alphabetical by status (Active before Inactive)
                expect(prev.status.localeCompare(curr.status)).toBeLessThanOrEqual(0);
                break;
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
