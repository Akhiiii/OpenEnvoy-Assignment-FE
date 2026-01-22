import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dashboard } from './Dashboard';

const meta: Meta<typeof Dashboard> = {
  title: 'Components/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: 'The name of the user to display in the greeting',
    },
    user: {
      control: 'object',
      description: 'User profile information for the sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Dashboard view with all components integrated.
 * Shows sidebar, top bar, stats strip, and customer table.
 */
export const Default: Story = {
  args: {
    userName: 'Evano',
    user: {
      name: 'Evano',
      role: 'Project Manager',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
  },
};

/**
 * Dashboard with a different user profile.
 */
export const DifferentUser: Story = {
  args: {
    userName: 'Jane Smith',
    user: {
      name: 'Jane Smith',
      role: 'Administrator',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
  },
};

/**
 * Dashboard with a long user name.
 */
export const LongUserName: Story = {
  args: {
    userName: 'Christopher Alexander',
    user: {
      name: 'Christopher Alexander',
      role: 'Senior Project Manager',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
};
