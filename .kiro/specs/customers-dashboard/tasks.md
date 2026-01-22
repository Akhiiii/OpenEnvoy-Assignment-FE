# Implementation Plan: Customers Dashboard

## Overview

This implementation plan breaks down the Customers Dashboard into discrete coding tasks. The approach follows a bottom-up strategy: build reusable design system components first, then compose them into the full dashboard. Each task builds incrementally, with property-based tests placed close to implementation to catch errors early.

## Tasks

- [x] 1. Project setup and design system foundation
  - Install dependencies: fast-check for property testing
  - Create directory structure: `src/components/`, `src/services/`, `src/types/`, `src/styles/`
  - Set up CSS Modules configuration in Vite
  - Create design tokens file (`styles/tokens.css`) with colors, spacing, typography
  - Configure Storybook for component development
  - _Requirements: 10.3_

- [x] 2. Core type definitions and mock data service
  - [x] 2.1 Create TypeScript interfaces for data models
    - Define `Customer`, `StatsData`, `PaginationState`, `TableFilters` types in `src/types/index.ts`
    - _Requirements: 9.1, 9.2_

  - [x] 2.2 Implement MockDataService class
    - Create `src/services/MockDataService.ts` with DataService interface
    - Implement `generateMockCustomers()` to create 256+ realistic customer records
    - Implement `getCustomers()` with filtering, sorting, and pagination logic
    - Implement `getStats()` to calculate statistics from mock data
    - Add simulated network delay (300ms for customers, 200ms for stats)
    - _Requirements: 9.1, 9.3, 9.4, 9.5_

  - [x] 2.3 Write property test for service pagination
    - **Property 16: Service Pagination Slice**
    - **Validates: Requirements 9.5**
    - Test that for any page number, page size, and dataset, the service returns the correct slice of data

  - [x] 2.4 Write property test for search filtering
    - **Property 7: Search Filtering**
    - **Validates: Requirements 5.2, 5.3, 5.4**
    - Test that for any search term, filtered results include only matching customers (case-insensitive, across name/company/email)

  - [x] 2.5 Write property test for sorting
    - **Property 9: Sort Order Correctness**
    - **Validates: Requirements 6.3**
    - Test that for any dataset and sort option, results are correctly ordered

  - [x] 2.6 Write unit tests for MockDataService
    - Test that service generates at least 256 customers
    - Test empty search returns all customers
    - Test stats calculation returns correct structure
    - _Requirements: 9.1_

- [x] 3. Base design system components
  - [x] 3.1 Create Button component
    - Implement `src/components/Button/Button.tsx` with variants (primary, secondary, ghost)
    - Create `Button.module.css` with styling
    - Create Storybook story showing all variants and states
    - _Requirements: 10.4_

  - [x] 3.2 Create StatusBadge component
    - Implement `src/components/StatusBadge/StatusBadge.tsx` accepting status prop
    - Create `StatusBadge.module.css` with green (Active) and red (Inactive) styles
    - Create Storybook story showing both variants
    - _Requirements: 4.4, 4.5, 10.4_

  - [x] 3.3 Write property test for StatusBadge rendering
    - **Property 5: Status Badge Rendering**
    - **Validates: Requirements 4.4, 4.5**
    - Test that for any customer status, correct badge color is rendered

  - [x] 3.4 Create SearchInput component
    - Implement `src/components/SearchInput/SearchInput.tsx` with icon and debouncing (300ms)
    - Create `SearchInput.module.css` with styling
    - Create Storybook story with interactive controls
    - _Requirements: 5.1, 10.4_

  - [x] 3.5 Create Dropdown component
    - Implement `src/components/Dropdown/Dropdown.tsx` with options and onChange
    - Create `Dropdown.module.css` with styling
    - Create Storybook story showing different option sets
    - _Requirements: 6.1, 10.4_

  - [x] 3.6 Write unit tests for base components
    - Test Button renders with correct variant classes
    - Test SearchInput debounces input
    - Test Dropdown calls onChange with selected value
    - _Requirements: 10.4_

- [x] 4. Table components
  - [x] 4.1 Create base Table component
    - Implement `src/components/Table/Table.tsx` with columns and data props
    - Support custom cell rendering via column definitions
    - Handle loading, empty, and error states
    - Create `Table.module.css` with styling
    - Create Storybook story showing all states
    - _Requirements: 4.2, 8.1, 8.2, 8.3, 10.4_

  - [x] 4.2 Write property test for table structure consistency
    - **Property 15: Table Structure Consistency**
    - **Validates: Requirements 8.4**
    - Test that for any table state (loading/error/empty/loaded), headers remain visible

  - [x] 4.3 Write unit tests for Table component
    - Test table renders correct number of rows
    - Test loading state shows spinner
    - Test empty state shows message
    - Test error state shows error message
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 4.4 Create Pagination component
    - Implement `src/components/Pagination/Pagination.tsx` with page navigation logic
    - Implement smart page number display with ellipsis for large page counts
    - Disable prev button on first page, next button on last page
    - Create `Pagination.module.css` with styling
    - Create Storybook story with different page counts
    - _Requirements: 7.2, 7.3, 7.7, 7.8, 7.9_

  - [x] 4.5 Write property test for current page highlighting
    - **Property 11: Current Page Highlighting**
    - **Validates: Requirements 7.2**
    - Test that for any current page, that page number is visually highlighted

  - [x] 4.6 Write property test for page navigation
    - **Property 12: Page Navigation**
    - **Validates: Requirements 7.4**
    - Test that clicking any valid page number displays the correct data slice

  - [x] 4.7 Write property test for sequential navigation
    - **Property 13: Sequential Page Navigation**
    - **Validates: Requirements 7.5, 7.6**
    - Test that next/previous buttons navigate correctly

  - [x] 4.8 Write property test for ellipsis display
    - **Property 14: Ellipsis Display**
    - **Validates: Requirements 7.9**
    - Test that ellipsis appears when totalPages exceeds maxVisiblePages

  - [x] 4.9 Write unit tests for Pagination component
    - Test prev button disabled on first page (edge case)
    - Test next button disabled on last page (edge case)
    - Test clicking page number calls onPageChange
    - _Requirements: 7.7, 7.8_

- [x] 5. CustomerTable composite component
  - [x] 5.1 Create CustomerTable component
    - Implement `src/components/CustomerTable/CustomerTable.tsx` integrating Table, SearchInput, Dropdown, Pagination
    - Implement client-side filtering logic using useMemo
    - Implement client-side sorting logic using useMemo
    - Implement pagination state management
    - Display "All Customers" header with "Active Members" link
    - Display footer with "Showing data X to Y of Z entries" format
    - Create `CustomerTable.module.css` with card styling
    - _Requirements: 4.1, 4.2, 4.3, 4.6, 5.2, 5.3, 5.4, 5.5, 6.2, 6.3, 6.5_

  - [x] 5.2 Write property test for page size limit
    - **Property 4: Page Size Limit**
    - **Validates: Requirements 4.3**
    - Test that any non-last page displays exactly 8 rows

  - [x] 5.3 Write property test for pagination footer format
    - **Property 6: Pagination Footer Format**
    - **Validates: Requirements 4.6**
    - Test that for any pagination state, footer displays correct range

  - [x] 5.4 Write property test for pagination updates with search
    - **Property 8: Pagination Updates with Search**
    - **Validates: Requirements 5.5**
    - Test that search resets to page 1 and recalculates total pages

  - [x] 5.5 Write property test for sort order invariance
    - **Property 10: Sort Order Invariance**
    - **Validates: Requirements 6.5**
    - Test that search/pagination don't change sort order

  - [x] 5.6 Write unit tests for CustomerTable
    - Test table displays correct columns (edge case: verify all 6 columns)
    - Test empty search returns all records (edge case)
    - Test default sort is "Newest"
    - Test header displays "All Customers" title
    - _Requirements: 4.1, 4.2, 5.6, 6.2_

  - [x] 5.7 Create Storybook story for CustomerTable
    - Show table with mock data
    - Show loading state
    - Show empty state
    - Show error state
    - _Requirements: 10.1, 10.5_

- [x] 6. Stats components
  - [x] 6.1 Create StatsCard component
    - Implement `src/components/StatsCard/StatsCard.tsx` with title, value, trend, icon, avatars props
    - Display trend with up/down arrow based on positive/negative value
    - Display avatars when provided
    - Create `StatsCard.module.css` with styling
    - Create Storybook story showing all variants
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 6.2 Write property test for trend indicator direction
    - **Property 3: Trend Indicator Direction**
    - **Validates: Requirements 3.5, 3.6**
    - Test that positive trends show upward arrow, negative trends show downward arrow

  - [x] 6.3 Write unit tests for StatsCard
    - Test card displays title and value
    - Test card displays avatars when provided
    - Test card displays icon
    - _Requirements: 3.2, 3.3, 3.4, 3.7_

  - [x] 6.4 Create StatsStrip component
    - Implement `src/components/StatsStrip/StatsStrip.tsx` rendering four StatsCards
    - Create cards for: Total Customers, Members, Active Now, and one more metric
    - Create `StatsStrip.module.css` with horizontal layout
    - Create Storybook story with mock stats data
    - _Requirements: 3.1_

  - [x] 6.5 Write unit tests for StatsStrip
    - Test strip displays exactly 4 cards
    - _Requirements: 3.1_

- [x] 7. Navigation components
  - [x] 7.1 Create Sidebar component
    - Implement `src/components/Sidebar/Sidebar.tsx` with navigation items and user profile
    - Display 6 navigation items: Dashboard, Product, Customers, Income, Promote, Help
    - Highlight active item based on activeItem prop
    - Display user mini-profile at bottom with avatar and name
    - Display icons alongside each label
    - Create `Sidebar.module.css` with styling
    - Create Storybook story showing different active states
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 7.2 Write property test for navigation active state
    - **Property 1: Navigation Active State**
    - **Validates: Requirements 1.2**
    - Test that for any selected navigation item, active state is applied

  - [x] 7.3 Write unit tests for Sidebar
    - Test sidebar displays all 6 navigation items
    - Test Customers is active by default
    - Test user profile displays at bottom
    - Test icons display alongside labels
    - _Requirements: 1.1, 1.3, 1.4, 1.5_

  - [x] 7.4 Create TopBar component
    - Implement `src/components/TopBar/TopBar.tsx` with greeting and search
    - Display greeting in format "Hello {userName} 👋,"
    - Include global search input on the right
    - Create `TopBar.module.css` with styling
    - Create Storybook story with different user names
    - _Requirements: 2.1, 2.2_

  - [x] 7.5 Write property test for greeting format
    - **Property 2: Greeting Format**
    - **Validates: Requirements 2.1**
    - Test that for any user name, greeting follows correct format

  - [x] 7.6 Write unit tests for TopBar
    - Test TopBar includes search input
    - _Requirements: 2.2_

- [x] 8. Dashboard integration and main app
  - [x] 8.1 Create Dashboard component
    - Implement `src/components/Dashboard/Dashboard.tsx` integrating Sidebar, TopBar, StatsStrip, CustomerTable
    - Fetch data from MockDataService on mount
    - Handle loading and error states
    - Pass data down to child components
    - Create `Dashboard.module.css` with layout grid
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 8.1, 8.3_

  - [x] 8.2 Write unit tests for Dashboard integration
    - Test Dashboard renders all major sections
    - Test loading state propagates to table
    - Test error state displays error message
    - _Requirements: 8.1, 8.3_

  - [x] 8.3 Update App.tsx to render Dashboard
    - Replace default Vite template with Dashboard component
    - Add global styles and CSS reset
    - _Requirements: All_

  - [x] 8.4 Create architecture.md documentation
    - Document goals, non-goals, tech stack decisions
    - Explain design system approach
    - Describe data layer and mock strategy
    - Outline sorting/filtering/pagination approach
    - Document error handling strategy
    - Keep under one page
    - _Requirements: All_

- [x] 9. Final polish and verification
  - [x] 9.1 Verify all Storybook stories are complete
    - Ensure all components have stories
    - Verify stories show different states
    - Test that `npm run storybook` works
    - _Requirements: 10.1, 10.3, 10.4, 10.5_

  - [x] 9.2 Add responsive styles
    - Add media queries for screen widths 1024px+
    - Ensure sidebar remains visible
    - Add horizontal scroll to table if needed
    - Allow stats cards to wrap on smaller screens
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [x] 9.3 Accessibility audit
    - Add ARIA labels to icon-only buttons
    - Verify keyboard navigation works
    - Test with screen reader
    - Check color contrast ratios
    - _Requirements: All_

  - [x] 9.4 Final checkpoint - Ensure all tests pass
    - Run `npm run test` and verify all tests pass
    - Run `npm run dev` and manually verify the UI matches the PNG
    - Run `npm run storybook` and verify all components render correctly
    - Ask the user if questions arise

## Notes

- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and error conditions
- The implementation follows a bottom-up approach: design system → composite components → full dashboard
- Mock data service can be easily swapped for real API by implementing the same DataService interface
