import React from 'react';
import styles from './Sidebar.module.css';

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
  {
    id: 'Dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.33 14.49L9.71 11.4C10.05 10.96 10.68 10.88 11.12 11.22L12.95 12.66C13.39 13 14.02 12.92 14.36 12.49L16.67 9.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'Product',
    label: 'Product',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.17 7.44L12 12.55L20.77 7.47" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21.61V12.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.93 2.48L4.59 5.44C3.38 6.11 2.39 7.79 2.39 9.17V14.82C2.39 16.2 3.38 17.88 4.59 18.55L9.93 21.52C11.07 22.15 12.94 22.15 14.08 21.52L19.42 18.55C20.63 17.88 21.62 16.2 21.62 14.82V9.17C21.62 7.79 20.63 6.11 19.42 5.44L14.08 2.47C12.93 1.84 11.07 1.84 9.93 2.48Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'Customers',
    label: 'Customers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16 14.56C1.74 16.18 1.74 18.82 4.16 20.43C6.91 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.92 12.73 4.16 14.56Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'Income',
    label: 'Income',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14.5C13.38 14.5 14.5 13.38 14.5 12C14.5 10.62 13.38 9.5 12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.38 10.62 14.5 12 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 9.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 9.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12C2 7.52 4 4 12 4C20 4 22 7.52 22 12C22 16.48 20 20 12 20C4 20 2 16.48 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'Promote',
    label: 'Promote',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.32 10H4.69C3.21 10 2 11.21 2 12.69V19.31C2 20.79 3.21 22 4.69 22H19.32C20.8 22 22.01 20.79 22.01 19.31V12.69C22 11.21 20.79 10 19.32 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 10V22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 10L19.07 5.34C19.6 4.99 19.66 4.23 19.19 3.8L17.95 2.66C17.56 2.3 16.97 2.26 16.54 2.56L12 5.59" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 10L4.93 5.34C4.4 4.99 4.34 4.23 4.81 3.8L6.05 2.66C6.44 2.3 7.03 2.26 7.46 2.56L12 5.59" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'Help',
    label: 'Help',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.09 9C9.32 8.33 9.79 7.77 10.41 7.41C11.03 7.05 11.76 6.91 12.47 7.02C13.18 7.13 13.83 7.48 14.31 8.01C14.79 8.54 15.07 9.21 15.07 9.91C15.07 11.82 12.07 12.77 12.07 12.77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16.5H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
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
    <aside className={styles.sidebar} data-testid="sidebar">
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 0C8.28 0 0 8.28 0 18.5C0 28.72 8.28 37 18.5 37C28.72 37 37 28.72 37 18.5C37 8.28 28.72 0 18.5 0Z" fill="#5932EA"/>
            <path d="M26.5 12.5L16.5 22.5L11.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {activeItem === item.id && (
                  <span className={styles.activeIndicator} aria-hidden="true">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
    </aside>
  );
};

export default Sidebar;
