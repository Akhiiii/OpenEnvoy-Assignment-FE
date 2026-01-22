import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'The currently active page',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3 },
      description: 'Maximum number of page buttons to show',
    },
  },
  args: {
    onPageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 40,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const WithEllipsis: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
    maxVisiblePages: 5,
  },
};

export const NearStart: Story = {
  args: {
    currentPage: 2,
    totalPages: 20,
    maxVisiblePages: 5,
  },
};

export const NearEnd: Story = {
  args: {
    currentPage: 19,
    totalPages: 20,
    maxVisiblePages: 5,
  },
};
