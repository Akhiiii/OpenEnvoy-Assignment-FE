import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomerTable } from './CustomerTable';
import type { Customer } from '../../types';

// Generate mock customers for stories
const generateMockCustomers = (count: number): Customer[] => {
  const names = [
    'Jane Cooper', 'Floyd Miles', 'Ronald Richards', 'Marvin McKinney',
    'Jerome Bell', 'Kathryn Murphy', 'Jacob Jones', 'Kristin Watson',
    'Eleanor Pena', 'Courtney Henry', 'Cameron Williamson', 'Theresa Webb',
    'Darlene Robertson', 'Devon Lane', 'Bessie Cooper', 'Arlene McCoy',
  ];
  
  const companies = [
    'Microsoft', 'Yahoo', 'Google', 'Apple', 'Amazon', 'Meta',
    'Netflix', 'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM',
  ];
  
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Australia', 'Japan', 'Brazil', 'India', 'Mexico',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `customer-${i + 1}`,
    name: names[i % names.length],
    company: companies[i % companies.length],
    phone: `(+1) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@${companies[i % companies.length].toLowerCase()}.com`,
    country: countries[i % countries.length],
    status: Math.random() > 0.3 ? 'Active' : 'Inactive' as const,
    createdAt: new Date(2024, 0, count - i),
  }));
};

const mockCustomers = generateMockCustomers(50);

const meta: Meta<typeof CustomerTable> = {
  title: 'Components/CustomerTable',
  component: CustomerTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    customers: {
      control: 'object',
      description: 'Array of customer data to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with mock customer data.
 * Shows the table with search, sort, and pagination functionality.
 */
export const Default: Story = {
  args: {
    customers: mockCustomers,
  },
};

/**
 * Loading state while fetching customer data.
 * Shows a spinner and loading message.
 */
export const Loading: Story = {
  args: {
    customers: [],
    loading: true,
  },
};

/**
 * Empty state when no customers exist or match search criteria.
 * Shows a helpful message to the user.
 */
export const Empty: Story = {
  args: {
    customers: [],
  },
};

/**
 * Error state when data fetching fails.
 * Shows an error message to the user.
 */
export const Error: Story = {
  args: {
    customers: [],
    error: 'Unable to load customers. Please try again.',
  },
};

/**
 * Table with a small dataset (single page).
 * Pagination shows only one page.
 */
export const SmallDataset: Story = {
  args: {
    customers: generateMockCustomers(5),
  },
};

/**
 * Table with a large dataset (many pages).
 * Demonstrates pagination with ellipsis.
 */
export const LargeDataset: Story = {
  args: {
    customers: generateMockCustomers(100),
  },
};
