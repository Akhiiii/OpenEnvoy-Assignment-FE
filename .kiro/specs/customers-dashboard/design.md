# Design Document: Customers Dashboard

## Overview

The Customers Dashboard is a React + TypeScript application that displays customer data with interactive filtering, sorting, and pagination. The system uses a component-based architecture with a mock data layer that can be easily swapped for real API calls. The design emphasizes reusability through a Storybook design system and maintains clean separation between UI components, business logic, and data management.

## Architecture

### High-Level Structure

```
┌─────────────────────────────────────────────────┐
│              Dashboard Layout                    │
│  ┌──────────┬──────────────────────────────┐   │
│  │          │      Top Bar                  │   │
│  │ Sidebar  ├──────────────────────────────┤   │
│  │          │      Stats Strip             │   │
│  │          ├──────────────────────────────┤   │
│  │          │   Customer Table Card        │   │
│  └──────────┴──────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules (for component isolation)
- **Design System**: Storybook 7
- **Testing**: Vitest + React Testing Library
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Data Layer**: Mock service with in-memory filtering/sorting/pagination

### Design Principles

1. **Component Isolation**: Each UI component is self-contained and reusable
2. **Single Responsibility**: Components handle one concern (presentation vs. logic)
3. **Easy Backend Integration**: Mock data service implements the same interface as future API service
4. **Type Safety**: Full TypeScript coverage with strict mode enabled
5. **Performance**: Memoization for expensive operations (filtering, sorting)

## Components and Interfaces

### Core Data Types

```typescript
interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
}

interface StatsData {
  totalCustomers: {
    count: number;
    trend: number; // percentage, positive or negative
  };
  members: {
    count: number;
    trend: number;
  };
  activeNow: {
    count: number;
    avatars: string[]; // URLs to avatar images
  };
}

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface TableFilters {
  searchTerm: string;
  sortBy: 'newest' | 'name' | 'status';
}
```

### Component Hierarchy

#### 1. Dashboard (Container)
- **Purpose**: Root component that orchestrates the entire page
- **Props**: None (fetches its own data)
- **State**: 
  - `customers: Customer[]`
  - `stats: StatsData`
  - `loading: boolean`
  - `error: string | null`
- **Responsibilities**: Data fetching, error handling, layout composition

#### 2. Sidebar
- **Purpose**: Navigation menu with active state management
- **Props**:
  ```typescript
  interface SidebarProps {
    activeItem: string;
    onNavigate: (item: string) => void;
    user: { name: string; role: string; avatar: string };
  }
  ```
- **Variants**: Collapsed (icon-only) and expanded states

#### 3. TopBar
- **Purpose**: Greeting and global search
- **Props**:
  ```typescript
  interface TopBarProps {
    userName: string;
    onSearch: (query: string) => void;
  }
  ```

#### 4. StatsStrip
- **Purpose**: Display metric cards in a row
- **Props**:
  ```typescript
  interface StatsStripProps {
    stats: StatsData;
  }
  ```
- **Children**: StatsCard components

#### 5. StatsCard
- **Purpose**: Individual metric display with trend
- **Props**:
  ```typescript
  interface StatsCardProps {
    title: string;
    value: number;
    trend?: number;
    icon: ReactNode;
    avatars?: string[];
  }
  ```
- **Variants**: With trend, with avatars, icon-only

#### 6. CustomerTable
- **Purpose**: Main data table with search, sort, and pagination
- **Props**:
  ```typescript
  interface CustomerTableProps {
    customers: Customer[];
    loading?: boolean;
    error?: string | null;
    onSearchChange: (term: string) => void;
    onSortChange: (sortBy: string) => void;
  }
  ```
- **State**:
  - `searchTerm: string`
  - `sortBy: 'newest' | 'name' | 'status'`
  - `currentPage: number`
- **Responsibilities**: Client-side filtering, sorting, pagination

#### 7. Table (Base Component)
- **Purpose**: Reusable table structure
- **Props**:
  ```typescript
  interface TableProps {
    columns: ColumnDef[];
    data: any[];
    loading?: boolean;
    emptyMessage?: string;
  }
  
  interface ColumnDef {
    key: string;
    header: string;
    render?: (value: any, row: any) => ReactNode;
  }
  ```

#### 8. StatusBadge
- **Purpose**: Visual status indicator
- **Props**:
  ```typescript
  interface StatusBadgeProps {
    status: 'Active' | 'Inactive';
  }
  ```
- **Variants**: Active (green), Inactive (red)

#### 9. Pagination
- **Purpose**: Page navigation controls
- **Props**:
  ```typescript
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
  }
  ```
- **Logic**: Smart page number display with ellipsis

#### 10. SearchInput
- **Purpose**: Reusable search field with icon
- **Props**:
  ```typescript
  interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }
  ```

#### 11. Dropdown
- **Purpose**: Reusable select/dropdown component
- **Props**:
  ```typescript
  interface DropdownProps {
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
    label?: string;
  }
  ```

## Data Models

### Mock Data Service

The mock data service provides a consistent interface that mirrors what a real API would provide:

```typescript
interface DataService {
  getCustomers(filters?: TableFilters, pagination?: PaginationState): Promise<{
    data: Customer[];
    total: number;
  }>;
  
  getStats(): Promise<StatsData>;
}

class MockDataService implements DataService {
  private customers: Customer[] = []; // 256+ mock records
  
  constructor() {
    this.customers = this.generateMockCustomers(256);
  }
  
  async getCustomers(filters, pagination) {
    // Simulate network delay
    await this.delay(300);
    
    // Apply filtering
    let filtered = this.filterCustomers(this.customers, filters?.searchTerm);
    
    // Apply sorting
    filtered = this.sortCustomers(filtered, filters?.sortBy);
    
    // Apply pagination
    const start = (pagination.currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const paginated = filtered.slice(start, end);
    
    return {
      data: paginated,
      total: filtered.length
    };
  }
  
  async getStats() {
    await this.delay(200);
    return this.calculateStats();
  }
  
  private filterCustomers(customers, searchTerm) {
    if (!searchTerm) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.company.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }
  
  private sortCustomers(customers, sortBy) {
    switch (sortBy) {
      case 'newest':
        return [...customers].sort((a, b) => 
          b.createdAt.getTime() - a.createdAt.getTime()
        );
      case 'name':
        return [...customers].sort((a, b) => 
          a.name.localeCompare(b.name)
        );
      case 'status':
        return [...customers].sort((a, b) => 
          a.status.localeCompare(b.status)
        );
      default:
        return customers;
    }
  }
  
  private generateMockCustomers(count: number): Customer[] {
    // Generate realistic mock data
    // Use libraries like faker or hand-crafted data
  }
  
  private calculateStats(): StatsData {
    // Calculate from mock customers
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Data Flow

1. **Initial Load**: Dashboard fetches customers and stats from MockDataService
2. **Search**: User types → CustomerTable updates searchTerm → triggers re-filter → updates displayed rows
3. **Sort**: User selects sort option → CustomerTable updates sortBy → triggers re-sort → updates displayed rows
4. **Pagination**: User clicks page → CustomerTable updates currentPage → slices filtered/sorted data → updates displayed rows

### State Management Strategy

- **Local State**: Each component manages its own UI state (input values, open/closed states)
- **Lifted State**: Dashboard holds customer data and passes down to CustomerTable
- **Derived State**: Filtered/sorted/paginated data is computed via useMemo to avoid unnecessary recalculations
- **No Global State**: Application is simple enough that prop drilling is acceptable

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Navigation Active State
*For any* navigation item, when that item is selected, it should be rendered with an active state class or styling applied.
**Validates: Requirements 1.2**

### Property 2: Greeting Format
*For any* user name, the Top Bar greeting should follow the format "Hello {name} 👋," where {name} is the provided user name.
**Validates: Requirements 2.1**

### Property 3: Trend Indicator Direction
*For any* Stats Card with a trend value, if the trend is positive (> 0), an upward arrow should be displayed; if the trend is negative (< 0), a downward arrow should be displayed.
**Validates: Requirements 3.5, 3.6**

### Property 4: Page Size Limit
*For any* page of customer data (except the last page), exactly 8 rows should be displayed in the table.
**Validates: Requirements 4.3**

### Property 5: Status Badge Rendering
*For any* customer record, if the status is "Active", the badge should render with green styling; if the status is "Inactive", the badge should render with red styling.
**Validates: Requirements 4.4, 4.5**

### Property 6: Pagination Footer Format
*For any* pagination state with current page P, page size S, and total items T, the footer should display "Showing data {start} to {end} of {T} entries" where start = (P-1) * S + 1 and end = min(P * S, T).
**Validates: Requirements 4.6**

### Property 7: Search Filtering
*For any* search term and customer dataset, the filtered results should include only customers where the search term (case-insensitive) appears in the name, company, or email fields.
**Validates: Requirements 5.2, 5.3, 5.4**

### Property 8: Pagination Updates with Search
*For any* search operation that changes the result set, the pagination should reset to page 1 and recalculate total pages based on the filtered result count.
**Validates: Requirements 5.5**

### Property 9: Sort Order Correctness
*For any* customer dataset and sort option (newest/name/status), the resulting order should be: newest = descending by createdAt date, name = ascending alphabetical by name, status = alphabetical by status.
**Validates: Requirements 6.3**

### Property 10: Sort Order Invariance
*For any* customer dataset with an applied sort order, performing search or pagination operations should not change the sort order of the results.
**Validates: Requirements 6.5**

### Property 11: Current Page Highlighting
*For any* pagination state with current page P, the page number P should be visually highlighted (different styling) in the pagination controls.
**Validates: Requirements 7.2**

### Property 12: Page Navigation
*For any* valid page number N within the range [1, totalPages], clicking that page number should display rows [(N-1) * pageSize] through [N * pageSize - 1] from the filtered and sorted dataset.
**Validates: Requirements 7.4**

### Property 13: Sequential Page Navigation
*For any* current page P where 1 < P < totalPages, clicking next should navigate to page P+1, and clicking previous should navigate to page P-1.
**Validates: Requirements 7.5, 7.6**

### Property 14: Ellipsis Display
*For any* pagination state where totalPages > maxVisiblePages, ellipsis (...) should appear between non-consecutive page number ranges in the pagination controls.
**Validates: Requirements 7.9**

### Property 15: Table Structure Consistency
*For any* table state (loading, error, empty, or loaded), the table header with column names should remain visible and properly structured.
**Validates: Requirements 8.4**

### Property 16: Service Pagination Slice
*For any* page number P, page size S, and dataset D, the Mock_Data_Service should return items from index (P-1) * S to min(P * S, D.length) - 1.
**Validates: Requirements 9.5**

## Error Handling

### Error Categories

1. **Data Loading Errors**
   - Network timeout (simulated in mock service)
   - Service unavailable
   - Invalid response format

2. **User Input Errors**
   - Invalid page number (out of range)
   - Invalid sort option
   - Malformed search query (though most strings are valid)

3. **State Errors**
   - Empty dataset
   - No search results
   - Invalid pagination state

### Error Handling Strategy

**Loading State**:
- Display skeleton loaders or spinner in table area
- Disable interactive controls (search, sort, pagination)
- Maintain table structure (headers visible)

**Empty State**:
- Show friendly message: "No customers found"
- If due to search: "No customers match your search. Try different keywords."
- Provide action: Clear search button

**Error State**:
- Display error message in table area: "Unable to load customers. Please try again."
- Provide retry button
- Log error details to console for debugging
- Maintain table structure

**Graceful Degradation**:
- If stats fail to load, show table anyway
- If table fails, show stats anyway
- Never show blank screen - always provide feedback

**Error Boundaries**:
- Wrap Dashboard in React Error Boundary
- Catch component errors and show fallback UI
- Log errors for monitoring

## Testing Strategy

### Dual Testing Approach

This project uses both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs
- Both approaches are complementary and necessary for complete validation

### Unit Testing

Unit tests focus on:
- **Specific examples**: Rendering specific components with known props
- **Edge cases**: Empty data, first/last page, single item, maximum items
- **Error conditions**: Loading states, error states, empty states
- **Integration points**: Component interactions, event handlers, state updates

Example unit tests:
- Sidebar renders with all 6 navigation items
- Table displays exactly 8 rows when data has 20 items
- Loading state shows spinner
- Empty state shows "No customers found" message
- Clicking page 2 calls onPageChange with 2

### Property-Based Testing

**Library**: fast-check (for TypeScript/JavaScript)

**Configuration**: Each property test runs minimum 100 iterations

**Tagging**: Each test references its design property:
```typescript
// Feature: customers-dashboard, Property 7: Search Filtering
```

Property tests focus on:
- **Universal behaviors**: Properties that hold for all valid inputs
- **Invariants**: Conditions that remain true across operations
- **Metamorphic properties**: Relationships between inputs and outputs
- **Round-trip properties**: Operations that should be reversible

Example property tests:
- For any search term, filtered results contain only matching customers
- For any sort option, results are correctly ordered
- For any page number, correct slice of data is displayed
- For any customer status, correct badge color is rendered

### Test Organization

```
src/
  components/
    Sidebar/
      Sidebar.tsx
      Sidebar.test.tsx          # Unit tests
      Sidebar.properties.test.tsx  # Property tests
    CustomerTable/
      CustomerTable.tsx
      CustomerTable.test.tsx
      CustomerTable.properties.test.tsx
  services/
    MockDataService.test.tsx
    MockDataService.properties.test.tsx
```

### Coverage Goals

- **Line coverage**: 80%+ for business logic
- **Branch coverage**: 75%+ for conditional logic
- **Property coverage**: All 16 properties implemented as tests
- **Component coverage**: All interactive components have tests

### Testing Commands

```bash
npm run test              # Run all tests
npm run test:unit         # Run unit tests only
npm run test:properties   # Run property tests only
npm run test:coverage     # Generate coverage report
```

### Storybook Testing

Storybook serves as living documentation and visual testing:
- Each component has stories showing all variants
- Stories demonstrate different states (default, loading, error, empty)
- Interactive controls for testing props
- Accessibility checks via a11y addon
- Visual regression testing (optional, via Chromatic)

## Implementation Notes

### Styling Approach

Use CSS Modules for component-scoped styling:
- Each component has a `.module.css` file
- Class names are locally scoped (no conflicts)
- Shared design tokens in `styles/tokens.css`
- Responsive breakpoints in `styles/breakpoints.css`

### Performance Considerations

1. **Memoization**: Use `useMemo` for expensive filtering/sorting operations
2. **Virtualization**: Not needed for 8 rows, but consider for larger page sizes
3. **Debouncing**: Debounce search input (300ms) to avoid excessive filtering
4. **Code Splitting**: Lazy load Storybook stories (not main app components)

### Accessibility

- Semantic HTML (table, nav, button elements)
- ARIA labels for icon-only buttons
- Keyboard navigation support (Tab, Enter, Arrow keys)
- Focus management (trap focus in dropdowns)
- Screen reader announcements for dynamic content changes
- Color contrast ratios meet WCAG AA standards

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features (optional chaining, nullish coalescing)
- No IE11 support required

### Future Backend Integration

To swap mock service for real API:

1. Create `ApiDataService` implementing `DataService` interface
2. Replace `MockDataService` with `ApiDataService` in Dashboard
3. Update error handling for real network errors
4. Add authentication headers if needed
5. No component changes required (same interface)

```typescript
class ApiDataService implements DataService {
  async getCustomers(filters, pagination) {
    const response = await fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify({ filters, pagination })
    });
    return response.json();
  }
  
  async getStats() {
    const response = await fetch('/api/stats');
    return response.json();
  }
}
```
