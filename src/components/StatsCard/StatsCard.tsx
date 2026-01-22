import React, { type ReactNode } from 'react';
import styles from './StatsCard.module.css';

export interface StatsCardProps {
  title: string;
  value: number;
  trend?: number;
  icon: ReactNode;
  avatars?: string[];
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  icon,
  avatars,
  className,
}) => {
  const cardClasses = [styles.card, className || ''].filter(Boolean).join(' ');

  const formatValue = (val: number): string => {
    return val.toLocaleString();
  };

  const renderTrend = () => {
    if (trend === undefined || trend === null) return null;

    const isPositive = trend > 0;
    const isNegative = trend < 0;
    const trendClasses = [
      styles.trend,
      isPositive ? styles.trendUp : '',
      isNegative ? styles.trendDown : '',
    ].filter(Boolean).join(' ');

    return (
      <span className={trendClasses} data-testid="trend-indicator">
        {isPositive && (
          <span className={styles.trendArrow} data-testid="trend-arrow-up" aria-label="Upward trend">
            ↑
          </span>
        )}
        {isNegative && (
          <span className={styles.trendArrow} data-testid="trend-arrow-down" aria-label="Downward trend">
            ↓
          </span>
        )}
        <span className={styles.trendValue}>{Math.abs(trend)}%</span>
      </span>
    );
  };

  const renderAvatars = () => {
    if (!avatars || avatars.length === 0) return null;

    return (
      <div className={styles.avatars} data-testid="avatars-container">
        {avatars.slice(0, 5).map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`User avatar ${index + 1}`}
            className={styles.avatar}
            style={{ zIndex: avatars.length - index }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cardClasses} data-testid="stats-card">
      <div className={styles.iconContainer} data-testid="icon-container">
        {icon}
      </div>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <div className={styles.valueRow}>
          <span className={styles.value} data-testid="stats-value">{formatValue(value)}</span>
          {renderTrend()}
          {renderAvatars()}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
