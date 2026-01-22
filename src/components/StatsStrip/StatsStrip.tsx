import React from 'react';
import type { StatsData } from '../../types';
import styles from './StatsStrip.module.css';
import { DesktopIcon, MemberIcon, TrendDownIcon, TrendUpIcon, UserGroupIcon } from '../../assets/icons';

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

const formatValue = (val: number): string => val.toLocaleString();

const renderTrend = (trend?: number) => {
  if (trend === undefined || trend === null) return null;
  const isPositive = trend > 0;
  const isNegative = trend < 0;
  
  return (
    <span 
      className={`${styles.trend}`}
      data-testid="trend-indicator"
    >
      {isPositive &&  <TrendUpIcon/>}
      {isNegative &&  <TrendDownIcon/>}
      {/* {isNegative && <span className={styles.trendArrow} aria-label="Downward trend">↓</span>} */}
      <span className={`${isPositive ? styles.trendUp : ''} ${isNegative ? styles.trendDown : ''}`}>{Math.abs(trend)}% </span><span className={styles.monthTxt}>this month</span>
    </span>
  );
};

const renderAvatars = (avatars?: string[]) => {
  if (!avatars || avatars.length === 0) return null;
  
  return (
    <div className={styles.avatars} data-testid="avatars-container">
      {avatars.slice(0, 5).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`User avatar ${index + 1}`}
          className={styles.avatar}
          style={{ zIndex: avatars.length + index }}
        />
      ))}
    </div>
  );
};

export const StatsStrip: React.FC<StatsStripProps> = ({ stats, className }) => {
  const stripClasses = [styles.strip, className || ''].filter(Boolean).join(' ');

  return (
    <div className={stripClasses} data-testid="stats-strip">
      {/* Total Customers */}
      <div className={styles.statItem}>
        {/* <div className={styles.iconContainer}>{UsersIcon}</div> */}
        <UserGroupIcon/>
        <div className={styles.content}>
          <span className={styles.title}>Total Customers</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{formatValue(stats.totalCustomers.count)}</span>
           
          </div>
          <span> {renderTrend(stats.totalCustomers.trend)}</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Members */}
      <div className={styles.statItem}>
        <MemberIcon/>
        <div className={styles.content}>
          <span className={styles.title}>Members</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{formatValue(stats.members.count)}</span>
           
          </div>
           {renderTrend(stats.members.trend)}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Active Now */}
      <div className={styles.statItem}>
      <DesktopIcon/>
        <div className={styles.content}>
          <span className={styles.title}>Active Now</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{formatValue(stats.activeNow.count)}</span>
           
          </div>
           {renderAvatars(stats.activeNow.avatars)}
        </div>
      </div>
    </div>
  );
};

export default StatsStrip;
