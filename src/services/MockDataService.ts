import type { Customer, StatsData, PaginationState, TableFilters, DataService } from '../types';

// Sample data for generating realistic mock customers
const firstNames = [
  'Jane', 'John', 'Emily', 'Michael', 'Sarah', 'David', 'Emma', 'James',
  'Olivia', 'William', 'Sophia', 'Benjamin', 'Isabella', 'Lucas', 'Mia',
  'Henry', 'Charlotte', 'Alexander', 'Amelia', 'Daniel', 'Harper', 'Matthew',
  'Evelyn', 'Joseph', 'Abigail', 'Samuel', 'Ella', 'Sebastian', 'Avery', 'Jack'
];

const lastNames = [
  'Cooper', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson',
  'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez',
  'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis'
];

const companies = [
  'Acme Corp', 'TechVision Inc', 'Global Solutions', 'Innovate Labs', 'Digital Dynamics',
  'CloudFirst', 'DataStream', 'NextGen Systems', 'Quantum Tech', 'Apex Industries',
  'Stellar Software', 'Prime Solutions', 'Elite Enterprises', 'Fusion Technologies',
  'Vertex Group', 'Synergy Partners', 'Catalyst Corp', 'Momentum Inc', 'Horizon Labs',
  'Summit Digital', 'Pinnacle Systems', 'Vanguard Tech', 'Nexus Solutions', 'Zenith Corp'
];

const countries = [
  'USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'Brazil',
  'India', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Singapore'
];

const avatarUrls = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
];


export class MockDataService implements DataService {
  private customers: Customer[] = [];
  private simulateDelay: boolean;

  constructor(simulateDelay: boolean = true) {
    this.customers = this.generateMockCustomers(256);
    this.simulateDelay = simulateDelay;
  }

  private generateMockCustomers(count: number): Customer[] {
    const customers: Customer[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const company = companies[Math.floor(Math.random() * companies.length)];
      const country = countries[Math.floor(Math.random() * countries.length)];
      
      // Generate phone number
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const prefix = Math.floor(Math.random() * 900) + 100;
      const lineNum = Math.floor(Math.random() * 9000) + 1000;
      const phone = `(${areaCode}) ${prefix}-${lineNum}`;
      
      // Generate email
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`;
      
      // Random status with 70% Active, 30% Inactive
      const status: 'Active' | 'Inactive' = Math.random() > 0.3 ? 'Active' : 'Inactive';
      
      // Random date within the last 2 years
      const daysAgo = Math.floor(Math.random() * 730);
      const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

      customers.push({
        id: `cust-${i + 1}`,
        name,
        company,
        phone,
        email,
        country,
        status,
        createdAt,
      });
    }

    return customers;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private filterCustomers(customers: Customer[], searchTerm?: string): Customer[] {
    if (!searchTerm || searchTerm.trim() === '') return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.company.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }

  private sortCustomers(customers: Customer[], sortBy?: 'newest' | 'name' | 'status'): Customer[] {
    const sorted = [...customers];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'status':
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  }

  async getCustomers(
    filters?: TableFilters,
    pagination?: PaginationState
  ): Promise<{ data: Customer[]; total: number }> {
    if (this.simulateDelay) {
      await this.delay(300);
    }

    // Apply filtering
    let filtered = this.filterCustomers(this.customers, filters?.searchTerm);

    // Apply sorting
    filtered = this.sortCustomers(filtered, filters?.sortBy);

    // Apply pagination
    const page = pagination?.currentPage ?? 1;
    const pageSize = pagination?.pageSize ?? 8;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = filtered.slice(start, end);

    return {
      data: paginated,
      total: filtered.length,
    };
  }

  async getStats(): Promise<StatsData> {
    if (this.simulateDelay) {
      await this.delay(200);
    }
    return this.calculateStats();
  }

  private calculateStats(): StatsData {
    const totalCustomers = this.customers.length;
    const activeCustomers = this.customers.filter(c => c.status === 'Active').length;
    
    // Simulate some "active now" users (random subset of active customers)
    const activeNowCount = Math.floor(Math.random() * 50) + 20;
    
    return {
      totalCustomers: {
        count: totalCustomers,
        trend: 16, // Simulated positive trend
      },
      members: {
        count: activeCustomers,
        trend: -1, // Simulated slight negative trend
      },
      activeNow: {
        count: activeNowCount,
        avatars: avatarUrls.slice(0, 5),
      },
    };
  }

  // Expose customers for testing purposes
  getCustomersSync(): Customer[] {
    return [...this.customers];
  }
}

// Export a singleton instance
export const mockDataService = new MockDataService();
