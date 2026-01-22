import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type ColumnDef } from './Table';

interface SampleData {
  id: string;
  name: string;
  email: string;
  status: string;
}

const sampleColumns: ColumnDef<SampleData>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const sampleData: SampleData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'Active' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Inactive' },
];

const meta: Meta<typeof Table<SampleData>> = {
  title: 'Components/Table',
  component: Table,
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
    emptyMessage: {
      control: 'text',
      description: 'Message to display when data is empty',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No customers found',
  },
};

export const Error: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    error: 'Unable to load customers. Please try again.',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No customers match your search. Try different keywords.',
  },
};

export const WithCustomRenderer: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      {
        key: 'status',
        header: 'Status',
        render: (value) => {
          const isActive = value === 'Active';
          return `${isActive ? '🟢' : '🔴'} ${value}`;
        },
      },
    ],
    data: sampleData,
  },
};
