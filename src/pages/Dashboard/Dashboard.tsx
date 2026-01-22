import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import type { NavItem, UserProfile } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { StatsStrip } from '../../components/StatsStrip';
import { CustomerTable } from '../../components/CustomerTable';
import { useCustomerData } from '../../hooks/useCustomerData';
import styles from './Dashboard.module.css';

/**
 * Dashboard Page
 * 
 * INTERVIEW TALKING POINTS:
 * 
 * 1. SEPARATION OF CONCERNS
 *    - Data fetching is handled by useCustomerData hook (not in component)
 *    - Component only handles UI rendering and user interactions
 *    - Makes testing easier - can mock the hook
 * 
 * 2. SIMPLE DATA SOURCE
 *    - Uses JSON file in /public folder (fetched via HTTP)
 *    - Easy to understand and modify
 *    - Can be replaced with real API without changing component
 * 
 * 3. CLEAN ARCHITECTURE
 *    - Props are minimal and well-typed
 *    - Default values provided for optional props
 *    - Each child component has single responsibility
 */

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
    // Could filter customers or call API here
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
