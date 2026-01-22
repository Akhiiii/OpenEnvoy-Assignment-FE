import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsStrip } from './StatsStrip';
import type { StatsData } from '../../types';

const mockStats: StatsData = {
  totalCustomers: {
    count: 5423,
    trend: 16,
  },
  members: {
    count: 1893,
    trend: -1,
  },
  activeNow: {
    count: 189,
    avatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
    ],
  },
};

const meta: Meta<typeof StatsStrip> = {
  title: 'Components/StatsStrip',
  component: StatsStrip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    stats: {
      control: 'object',
      description: 'Statistics data to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: mockStats,
  },
};

export const AllPositiveTrends: Story = {
  args: {
    stats: {
      totalCustomers: {
        count: 5423,
        trend: 16,
      },
      members: {
        count: 1893,
        trend: 8,
      },
      activeNow: {
        count: 189,
        avatars: [
          'https://i.pravatar.cc/150?img=1',
          'https://i.pravatar.cc/150?img=2',
          'https://i.pravatar.cc/150?img=3',
        ],
      },
    },
  },
};

export const AllNegativeTrends: Story = {
  args: {
    stats: {
      totalCustomers: {
        count: 4200,
        trend: -5,
      },
      members: {
        count: 1500,
        trend: -3,
      },
      activeNow: {
        count: 89,
        avatars: [
          'https://i.pravatar.cc/150?img=6',
          'https://i.pravatar.cc/150?img=7',
        ],
      },
    },
  },
};

export const LargeNumbers: Story = {
  args: {
    stats: {
      totalCustomers: {
        count: 1234567,
        trend: 25,
      },
      members: {
        count: 987654,
        trend: 12,
      },
      activeNow: {
        count: 45678,
        avatars: [
          'https://i.pravatar.cc/150?img=10',
          'https://i.pravatar.cc/150?img=11',
          'https://i.pravatar.cc/150?img=12',
          'https://i.pravatar.cc/150?img=13',
          'https://i.pravatar.cc/150?img=14',
        ],
      },
    },
  },
};
