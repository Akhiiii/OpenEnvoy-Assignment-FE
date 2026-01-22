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
  // Navigation state - which menu item is active
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('Customers');

  // Fetch customer data using custom hook
  // This keeps data fetching logic separate from UI
  const { customers, stats, loading, error } = useCustomerData();

  // Handle sidebar navigation
  const handleNavigate = (item: NavItem) => {
    setActiveNavItem(item);
  };

  // Handle search from top bar
  const handleGlobalSearch = (query: string) => {
    console.log('Global search:', query);
  };

  return (
    <div className={styles.dashboard} data-testid="dashboard">
      {/* Left sidebar with navigation */}
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={handleNavigate}
        user={user}
      />

      {/* Main content area */}
      <main className={styles.main}>
        {/* Top bar with search and user greeting */}
        <TopBar userName={userName} onSearch={handleGlobalSearch} />

        <div className={styles.content}>
          {/* Stats cards showing key metrics */}
          {stats && <StatsStrip stats={stats} className={styles.stats} />}
          
          {/* Loading state for stats */}
          {!stats && loading && (
            <div className={styles.statsPlaceholder} data-testid="stats-loading">
              Loading statistics...
            </div>
          )}

          {/* Customer data table with search, sort, pagination */}
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
