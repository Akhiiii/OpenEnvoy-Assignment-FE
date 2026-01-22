# Customers Dashboard Architecture

## Goals
- Display customer data with filtering, sorting, and pagination
- Provide a clean, responsive dashboard interface
- Enable easy backend integration by abstracting data layer
- Maintain component reusability through a design system

## Non-Goals
- Real-time data synchronization
- User authentication/authorization
- Backend API implementation
- Mobile-first responsive design (desktop-focused, 1024px+)

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: CSS Modules with design tokens
- **Testing**: Vitest + React Testing Library + fast-check (property-based)
- **Design System**: Storybook 7

## Architecture Overview

```
Dashboard (Container)
├── Sidebar (Navigation)
├── TopBar (Greeting + Global Search)
├── StatsStrip (4 StatsCards)
└── CustomerTable (Search + Sort + Table + Pagination)
```

## Data Layer
- `MockDataService` implements `DataService` interface
- Generates 256+ realistic customer records
- Supports filtering (name/company/email), sorting (newest/name/status), pagination
- Simulates network delay (300ms customers, 200ms stats)
- **Backend Integration**: Replace `MockDataService` with `ApiDataService` implementing same interface

## Sorting/Filtering/Pagination
- **Client-side processing** using `useMemo` for performance
- Search: Case-insensitive across name, company, email fields
- Sort: Newest (date desc), Name (alpha asc), Status (alpha asc)
- Pagination: 8 rows per page, smart ellipsis for large page counts
- Search resets to page 1; sort order preserved across operations

## Error Handling
- **Loading**: Spinner in table area, disabled controls
- **Empty**: Friendly message with search suggestions
- **Error**: Error message with retry option
- **Graceful degradation**: Stats and table load independently
