import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeItem: {
      control: 'select',
      options: ['Dashboard', 'Product', 'Customers', 'Income', 'Promote', 'Help'],
      description: 'The currently active navigation item',
    },
    user: {
      description: 'User profile information displayed at the bottom',
    },
  },
  args: {
    onNavigate: fn(),
    user: {
      name: 'Evano',
      role: 'Project Manager',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeItem: 'Customers',
  },
};

export const DashboardActive: Story = {
  args: {
    activeItem: 'Dashboard',
  },
};

export const ProductActive: Story = {
  args: {
    activeItem: 'Product',
  },
};

export const CustomersActive: Story = {
  args: {
    activeItem: 'Customers',
  },
};

export const IncomeActive: Story = {
  args: {
    activeItem: 'Income',
  },
};

export const PromoteActive: Story = {
  args: {
    activeItem: 'Promote',
  },
};

export const HelpActive: Story = {
  args: {
    activeItem: 'Help',
  },
};

export const DifferentUser: Story = {
  args: {
    activeItem: 'Customers',
    user: {
      name: 'Jane Smith',
      role: 'Administrator',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
  },
};
