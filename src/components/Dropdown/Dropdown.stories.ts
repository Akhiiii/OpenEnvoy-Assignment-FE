import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently selected value',
    },
    label: {
      control: 'text',
      description: 'Optional label displayed before the dropdown',
    },
    options: {
      control: 'object',
      description: 'Array of options with label and value',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'newest',
    options: [
      { label: 'Newest', value: 'newest' },
      { label: 'Name', value: 'name' },
      { label: 'Status', value: 'status' },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Sort by:',
    value: 'newest',
    options: [
      { label: 'Newest', value: 'newest' },
      { label: 'Name', value: 'name' },
      { label: 'Status', value: 'status' },
    ],
  },
};

export const StatusFilter: Story = {
  args: {
    label: 'Status:',
    value: 'all',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
};

export const PageSize: Story = {
  args: {
    label: 'Show:',
    value: '8',
    options: [
      { label: '8 per page', value: '8' },
      { label: '16 per page', value: '16' },
      { label: '32 per page', value: '32' },
    ],
  },
};
