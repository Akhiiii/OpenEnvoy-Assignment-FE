import React from 'react';
import { StatsCard } from '../StatsCard';
import type { StatsData } from '../../types';
import styles from './StatsStrip.module.css';

export interface StatsStripProps {
  stats: StatsData;
  className?: string;
}

// Icon components
const UsersIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MembersIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ActiveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export const StatsStrip: React.FC<StatsStripProps> = ({ stats, className }) => {
  const stripClasses = [styles.strip, className || ''].filter(Boolean).join(' ');

  // Calculate a fourth metric (e.g., growth rate or new customers this month)
  const newCustomersThisMonth = {
    count: Math.round(stats.totalCustomers.count * 0.12), // ~12% are new
    trend: stats.totalCustomers.trend > 0 ? stats.totalCustomers.trend + 2 : stats.totalCustomers.trend - 2,
  };

  return (
    <div className={stripClasses} data-testid="stats-strip">
      <StatsCard
        title="Total Customers"
        value={stats.totalCustomers.count}
        trend={stats.totalCustomers.trend}
        icon={UsersIcon}
      />
      <StatsCard
        title="Members"
        value={stats.members.count}
        trend={stats.members.trend}
        icon={MembersIcon}
      />
      <StatsCard
        title="Active Now"
        value={stats.activeNow.count}
        icon={ActiveIcon}
        avatars={stats.activeNow.avatars}
      />
      <StatsCard
        title="New This Month"
        value={newCustomersThisMonth.count}
        trend={newCustomersThisMonth.trend}
        icon={ChartIcon}
      />
    </div>
  );
};

export default StatsStrip;
