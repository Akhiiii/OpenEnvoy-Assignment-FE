import React from 'react';
import styles from './StatusBadge.module.css';

export type CustomerStatus = 'Active' | 'Inactive';

export interface StatusBadgeProps {
  status: CustomerStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const badgeClasses = [
    styles.badge,
    status === 'Active' ? styles.active : styles.inactive,
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} data-status={status}>
      {status}
    </span>
  );
};

export default StatusBadge;
