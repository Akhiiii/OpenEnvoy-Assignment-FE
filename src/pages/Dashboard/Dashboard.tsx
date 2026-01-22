import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import type { NavItem, UserProfile } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { StatsStrip } from '../../components/StatsStrip';
import { CustomerTable } from '../../components/CustomerTable';
import { useCustomerData } from '../../hooks/useCustomerData';
import styles from './Dashboard.module.css';

export interface DashboardProps {
  userName?: string;
  user?: UserProfile;
}

const defaultUser: UserProfile = {
  name: 'Evano',
  role: 'Project Manager',
  avatar: 'https://i.pravatar.cc/150?img=68',
};

export const Dashboard: React.FC<DashboardProps> = ({
  userName = 'Evano',
  user = defaultUser,
}) => {
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('Customers');
  const { customers, stats, loading, error } = useCustomerData();

  const handleNavigate = (item: NavItem) => setActiveNavItem(item);
  const handleGlobalSearch = (query: string) => console.log('Global search:', query);

  return (
    <div className={styles.dashboard} data-testid="dashboard">
      <Sidebar activeItem={activeNavItem} onNavigate={handleNavigate} user={user} />

      <main className={styles.main}>
        <TopBar userName={userName} onSearch={handleGlobalSearch} />

        <div className={styles.content}>
          {stats && <StatsStrip stats={stats} className={styles.stats} />}
          {!stats && loading && (
            <div className={styles.statsPlaceholder} data-testid="stats-loading">
              Loading statistics...
            </div>
          )}

          <CustomerTable
            customers={customers}
            loading={loading}
            error={error}
            className={styles.table}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
