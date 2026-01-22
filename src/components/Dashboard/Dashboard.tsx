import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import type { NavItem, UserProfile } from '../Sidebar';
import { TopBar } from '../TopBar';
import { StatsStrip } from '../StatsStrip';
import { CustomerTable } from '../CustomerTable';
import { MockDataService } from '../../services/MockDataService';
import type { Customer, StatsData } from '../../types';
import styles from './Dashboard.module.css';

export interface DashboardProps {
  dataService?: MockDataService;
  userName?: string;
  user?: UserProfile;
}

const defaultUser: UserProfile = {
  name: 'Evano',
  role: 'Project Manager',
  avatar: 'https://i.pravatar.cc/150?img=68',
};

export const Dashboard: React.FC<DashboardProps> = ({
  dataService,
  userName = 'Evano',
  user = defaultUser,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('Customers');

  // Create or use provided data service
  const service = dataService || new MockDataService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch stats first
        const statsResult = await service.getStats();

        // Get all customers for client-side filtering
        const allCustomersResult = await service.getCustomers(
          undefined,
          { currentPage: 1, pageSize: 1000, totalItems: 0, totalPages: 0 }
        );

        setCustomers(allCustomersResult.data);
        setStats(statsResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = (item: NavItem) => {
    setActiveNavItem(item);
  };

  const handleGlobalSearch = (query: string) => {
    // Global search could be implemented here
    console.log('Global search:', query);
  };

  return (
    <div className={styles.dashboard} data-testid="dashboard">
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={handleNavigate}
        user={user}
      />
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
