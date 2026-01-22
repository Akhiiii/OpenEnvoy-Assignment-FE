import type { Meta, StoryObj } from '@storybook/react-vite';
import { createElement } from 'react';
import { StatsCard } from './StatsCard';

// Create icon elements for stories using createElement
const UsersIcon = createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 32,
  height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}, [
  createElement('path', { key: '1', d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
  createElement('circle', { key: '2', cx: 9, cy: 7, r: 4 }),
  createElement('path', { key: '3', d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
  createElement('path', { key: '4', d: 'M16 3.13a4 4 0 0 1 0 7.75' }),
]);

const meta: Meta<typeof StatsCard> = {
  title: 'Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the stats card',
    },
    value: {
      control: 'number',
      description: 'The numeric value to display',
    },
    trend: {
      control: 'number',
      description: 'The trend percentage (positive or negative)',
    },
    avatars: {
      control: 'object',
      description: 'Array of avatar URLs to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Customers',
    value: 5423,
    icon: UsersIcon,
  },
};

export const WithPositiveTrend: Story = {
  args: {
    title: 'Total Customers',
    value: 5423,
    trend: 16,
    icon: UsersIcon,
  },
};

export const WithNegativeTrend: Story = {
  args: {
    title: 'Members',
    value: 1893,
    trend: -1,
    icon: UsersIcon,
  },
};

export const WithAvatars: Story = {
  args: {
    title: 'Active Now',
    value: 189,
    icon: UsersIcon,
    avatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
    ],
  },
};

export const ZeroTrend: Story = {
  args: {
    title: 'Inactive Users',
    value: 234,
    trend: 0,
    icon: UsersIcon,
  },
};

export const LargeValue: Story = {
  args: {
    title: 'Total Revenue',
    value: 1234567,
    trend: 8,
    icon: UsersIcon,
  },
};
