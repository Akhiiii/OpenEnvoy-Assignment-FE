import React from 'react';
import styles from './Sidebar.module.css';
import {
  DashboardIcon,
  ProductIcon,
  CustomersIcon,
  IncomeIcon,
  PromoteIcon,
  HelpIcon,
  LogoIcon,
  ChevronRightIcon,
} from '../../assets/icons';

export type NavItem = 'Dashboard' | 'Product' | 'Customers' | 'Income' | 'Promote' | 'Help';

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
}

export interface SidebarProps {
  activeItem?: NavItem;
  onNavigate?: (item: NavItem) => void;
  user: UserProfile;
}

const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'Product', label: 'Product', icon: <ProductIcon /> },
  { id: 'Customers', label: 'Customers', icon: <CustomersIcon /> },
  { id: 'Income', label: 'Income', icon: <IncomeIcon /> },
  { id: 'Promote', label: 'Promote', icon: <PromoteIcon /> },
  { id: 'Help', label: 'Help', icon: <HelpIcon /> },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'Customers',
  onNavigate,
  user,
}) => {
  const handleNavClick = (item: NavItem) => {
    if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <div className={styles.sidebar} data-testid="sidebar">
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <LogoIcon />
        </div>
        <span className={styles.logoText}>Dashboard</span>
        <span className={styles.version}>v.01</span>
      </div>

      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`${styles.navItem} ${activeItem === item.id ? styles.active : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeItem === item.id ? 'page' : undefined}
                data-testid={`nav-item-${item.id.toLowerCase()}`}
                disabled={activeItem != item.id}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.id != "Dashboard" && (
                  <span className={styles.activeIndicator} aria-hidden="true">
                    {activeItem === item.id ?<ChevronRightIcon color='#FFFFFF' />:<ChevronRightIcon color='#9197B3' />}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.userProfile} data-testid="user-profile">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className={styles.userAvatar}
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
