# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

PGS (Personal Golf Score) is a React-based web application for tracking golf games and performance. Users can register, log in, record their golf rounds, track shot outcomes, distances, penalties, putts, and sand saves. The application is built with React 18, TypeScript, Material-UI, Firebase for authentication and data storage, and Redux Toolkit for state management.

## Common Development Commands

### Development Server
```bash
npm start
# Runs the Vite development server with hot reload
```

### Build
```bash
npm run build
# TypeScript compilation followed by Vite build for production
```

### Preview Production Build
```bash
npm run serve
# Preview the production build locally
```

### Testing
The project uses Vitest for testing:
```bash
# Run tests (note: limited test coverage currently exists)
npx vitest
# Run tests in watch mode
npx vitest --watch
# Run tests with coverage
npx vitest --coverage
```

### Release Management
```bash
npm run release
# Creates a new release using release-it (configured for GitHub releases)
```

### Firebase Deployment
The project is configured for Firebase Hosting:
```bash
firebase deploy
# Deploy to Firebase (requires Firebase CLI and authentication)
```

## Architecture & Code Structure

### State Management (Redux Toolkit)
The application uses Redux Toolkit with Redux Persist for state management. The store is modular with feature-based slices:

- **Player Management**: `features/player/` - User profile, golf bag, and statistics
- **Round Management**: `features/round/`, `features/rounds/` - Individual round details and round collections  
- **New Round Creation**: `features/newRound/` - Complex workflow for creating new golf rounds
- **Application Controls**: `features/app/` - UI state and loading indicators
- **User Authentication**: `features/user/` - Authentication state

Key architectural patterns:
- Redux slices are organized by domain (player, rounds, user, etc.)
- Async actions use createAsyncThunk with Firebase integration
- State is partially persisted (`newRound` and `singleRound` slices)

### Component Architecture
Components are organized by feature and type:

- **Page Components**: `pages/` - Route-level components (Dashboard, AddNewRound, Statistics, etc.)
- **Feature Components**: `components/[Feature]/` - Feature-specific components grouped by domain
- **Common Components**: `components/common/` - Reusable UI components
- **Layout Components**: `components/layout/` - App shell and navigation
- **Dialog Components**: `components/Dialog/` - Modal dialogs for data entry

### Firebase Integration
- **Authentication**: Firebase Auth for user management
- **Database**: Firestore for data storage with collections for players, rounds, and statistics
- **Hosting**: Firebase Hosting for deployment (configured in firebase.json)

### Path Aliases
The project uses TypeScript path aliases for cleaner imports:
- `@/calc/*` - Calculation utilities
- `@/components/*` - React components
- `@/features/*` - Redux slices and state management
- `@/hooks/*` - Custom React hooks
- `@/pages/*` - Route components
- `@/types/*` - TypeScript type definitions
- `@/utils/*` - Utility functions
- `@/styles/*` - Styled components and theme utilities

### Material-UI Integration
- Custom theme system with light/dark mode support (`styles/ThemeSetup.styles.tsx`)
- Styled components using Material-UI's styled API
- Extensive use of Material-UI components (Data Grid, Date Pickers, Charts)
- Custom styled components organized by type (Box, Card, Grid, etc.)

### Data Flow Patterns
1. **Golf Round Creation**: Multi-step wizard workflow with temporary state management
2. **Statistics**: Complex calculations for golf metrics (distances, totals, averages)
3. **Real-time Updates**: Firebase listeners for data synchronization
4. **Form Management**: Custom hooks for form state and validation

### Key Business Logic
- **Golf Scoring**: Shot tracking, hole-by-hole scoring, penalty handling
- **Distance Tracking**: Club distance calculations and averages
- **Statistics**: Performance metrics, trends, and historical data analysis
- **Club Management**: Golf bag setup and club distance configuration

## Firebase Configuration

The project uses Firebase for:
- Authentication (email/password, potentially social providers)
- Firestore database with collections: `players/{uid}/rounds/{roundId}`
- Hosting configuration in `firebase.json` (SPA routing, caching headers)

## Testing Strategy

- **Unit Tests**: Using Vitest and React Testing Library
- **Component Tests**: Testing React components in isolation
- **Current Status**: Limited test coverage exists (mainly the basic App.test.tsx)
- **Setup Files**: `setupTests.ts` for test configuration

## Development Notes

- **TypeScript**: Strict TypeScript configuration with path aliases
- **Code Organization**: Feature-based folder structure with clear separation of concerns  
- **State Persistence**: Important user data is persisted across sessions
- **Responsive Design**: Material-UI breakpoint system for mobile compatibility
- **Performance**: Lazy loading with React.Suspense for route-based code splitting

## Deployment

The application is configured for Firebase Hosting:
- Build output goes to `dist/` directory
- SPA routing handled via `firebase.json` rewrites
- Custom headers for JavaScript/CSS files
