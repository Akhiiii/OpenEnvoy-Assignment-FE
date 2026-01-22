import React from 'react';
import type { StatsData } from '../../types';
import styles from './StatsStrip.module.css';
import { DesktopIcon, MemberIcon, TrendDownIcon, TrendUpIcon, UserGroupIcon } from '../../assets/icons';

export interface StatsStripProps {
  stats: StatsData;
  className?: string;
}

const formatValue = (val: number): string => val.toLocaleString();

const TrendIndicator: React.FC<{ trend?: number }> = ({ trend }) => {
  if (trend === undefined || trend === null) return null;
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <span className={styles.trend} data-testid="trend-indicator">
      {isPositive && <TrendUpIcon />}
      {isNegative && <TrendDownIcon />}
      <span className={isPositive ? styles.trendUp : isNegative ? styles.trendDown : ''}>
        {Math.abs(trend)}%{' '}
      </span>
      <span className={styles.monthTxt}>this month</span>
    </span>
  );
};

const AvatarStack: React.FC<{ avatars?: string[] }> = ({ avatars }) => {
  if (!avatars?.length) return null;

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
  const stripClasses = [styles.strip, className].filter(Boolean).join(' ');

  return (
    <div className={stripClasses} data-testid="stats-strip">
      <div className={styles.statItem}>
        <UserGroupIcon />
        <div className={styles.content}>
          <span className={styles.title}>Total Customers</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{formatValue(stats.totalCustomers.count)}</span>
          </div>
          <TrendIndicator trend={stats.totalCustomers.trend} />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.statItem}>
        <MemberIcon />
        <div className={styles.content}>
          <span className={styles.title}>Members</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{formatValue(stats.members.count)}</span>
          </div>
          <TrendIndicator trend={stats.members.trend} />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.statItem}>
        <DesktopIcon />
        <div className={styles.content}>
          <span className={styles.title}>Active Now</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{formatValue(stats.activeNow.count)}</span>
          </div>
          <AvatarStack avatars={stats.activeNow.avatars} />
        </div>
      </div>
    </div>
  );
};

export default StatsStrip;
