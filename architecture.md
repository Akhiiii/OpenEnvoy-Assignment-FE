# Customers Dashboard Architecture

## Goals
- Display customer data with filtering, sorting, and pagination
- Enable easy switch to backend API integration via interface abstraction
- Provide layout/spacing and icons similar to Figma design
- Maintain component reusability through a design system

## Non-Goals
- Real-time data synchronization
- User authentication
- Backend API implementation
- Mobile-first responsive design

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build**: Vite 7
- **Styling**: CSS Modules with design tokens (`src/styles/tokens.css`)
- **Testing**: Vitest 4 + React Testing Library + Property-based testing (fast-check)
- **Design System**: Storybook 10 with accessibility addon

## Architecture Overview

```
App
└── Dashboard (Page Container)
    ├── Sidebar (Navigation + User Profile)
    ├── TopBar (Greeting + Global Search)
    ├── StatsStrip (3 Stats Cards: Total Customers, Members, Active Now)
    └── CustomerTable (Search + Sort Dropdown + Table + Pagination)
```

## Component Hierarchy

| Component | Responsibility |
|-----------|----------------|
| `Dashboard` | Page layout, data fetching via `useCustomerData` hook |
| `Sidebar` | Navigation menu, user profile display |
| `TopBar` | User greeting, global search input |
| `StatsStrip` | Display stats cards with trends and avatars |
| `CustomerTable` | Search, sort, pagination controls + data table |
| `Table` | Generic reusable table with loading/error/empty states |
| `Pagination` | Page navigation with smart ellipsis |
| `SearchInput` | Reusable search input component |
| `Dropdown` | Reusable dropdown for sort options |
| `StatusBadge` | Active/Inactive status indicator |
| `Button` | Reusable button component |

## Data Layer

### Data Source
- Static JSON file at `/public/data/customers.json`
- Fetched via HTTP (`fetch()`) to simulate API behavior
- 400 customer records generated via `scripts/generateData.js` using UUID v4

### Data Hook (`useCustomerData`)
- Custom hook isolates data fetching from UI components
- Returns `{ customers, stats, loading, error }` state
- Transforms date strings to `Date` objects on load
- Easy to swap with real API without changing components

### TypeScript Interfaces
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
  totalCustomers: { count: number; trend: number };
  members: { count: number; trend: number };
  activeNow: { count: number; avatars: string[] };
}

```

### Backend Integration Path
Replace `fetch('/data/customers.json')` in `useCustomerData` with API calls to your backend endpoints

## Sorting/Filtering/Pagination

### Implementation
- **Client-side processing** using `useMemo` for performance
- All logic contained in `CustomerTable` component

### Search
- Case-insensitive filtering across `name`, `company`, `email` fields
- Resets to page 1 on search term change

### Sort Options
- **Newest**: Date descending (`createdAt`)
- **Name**: Alphabetical ascending
- **Status**: Alphabetical ascending (Active before Inactive)

### Pagination
- 8 rows per page (`PAGE_SIZE = 8`)
- Smart ellipsis for large page counts (`maxVisiblePages = 5`)
- Shows "Showing data X to Y of Z entries" footer

## Error Handling

| State | Behavior |
|-------|----------|
| **Loading** | Spinner in table body, "Loading..." text |
| **Error** | Error message with warning icon in table |
| **Empty (no data)** | "No data found" message |
| **Empty (filtered)** | "No customers match your search. Try different keywords." |
| **Stats loading** | Separate loading placeholder for stats strip |

## Design System

### Design Tokens (`src/styles/tokens.css`)
- **Colors**: Primary (#5932EA), success (#16C098), error (#DF0404), neutral grays
- **Spacing**: 4px base scale (xs: 4px → 3xl: 48px)
- **Typography**: System font stack, sizes 12px-24px
- **Border Radius**: sm (4px) → full (9999px)
- **Shadows**: sm, md
- **Transitions**: fast (150ms)

### CSS Architecture
- CSS Modules for component-scoped styles
- Global reset (`src/styles/reset.css`)
- Desktop-only layout (min-width: 1024px)

### Icons
- Custom SVG icons in `src/assets/icons/`
- Consistent 24x24 sizing with currentColor fill

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)
- Component rendering and interaction tests
- Hook behavior tests with mocked fetch
- Located alongside components (`*.test.tsx`)

### Property-Based Tests (fast-check)
- `Table.properties.test.tsx` - Table rendering invariants
- `Pagination.properties.test.tsx` - Pagination logic correctness

### Storybook
- Visual component documentation
- Accessibility testing via `@storybook/addon-a11y`
- Interactive component playground

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/
│   ├── CustomerTable/
│   ├── Dropdown/
│   ├── Pagination/
│   ├── SearchInput/
│   ├── Sidebar/
│   ├── StatsStrip/
│   ├── StatusBadge/
│   ├── Table/
│   └── TopBar/
├── hooks/               # Custom React hooks
│   └── useCustomerData.ts
├── pages/               # Page components
│   └── Dashboard/
├── styles/              # Global styles and tokens
├── types/               # TypeScript interfaces
└── assets/icons/        # SVG icons
```
