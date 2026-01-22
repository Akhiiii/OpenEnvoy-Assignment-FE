import React from 'react';
import styles from './TopBar.module.css';
import { SearchInput } from '../SearchInput';

export interface TopBarProps {
  userName: string;
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  userName,
  onSearch,
}) => {
  const handleSearchChange = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className={styles.topBar} data-testid="top-bar" role="banner">
      <div className={styles.greeting} data-testid="greeting">
        <h1 className={styles.greetingText}>Hello {userName} 👋,</h1>
      </div>
      <div className={styles.searchContainer}>
        <SearchInput
          placeholder="Search"
          onChange={handleSearchChange}
          aria-label="Global search"
        />
      </div>
    </header>
  );
};

export default TopBar;
