# Codebase Structure

**Analysis Date:** 2026-05-17

## Directory Layout

```
personalgolfscore/
├── .env                          # Environment configuration (secrets)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── .prettierrc                   # Code formatting rules
├── .nvmrc                        # Node version (22.14.0)
├── AGENTS.md                     # Project documentation
│
├── src/
│   ├── index.tsx                 # React entry point
│   ├── index.css                 # Global styles
│   ├── App.tsx                   # Root component + routing
│   ├── App.test.tsx              # App unit tests
│   ├── reportWebVitals.ts        # Performance metrics
│   ├── setupTests.ts             # Test setup
│   │
│   ├── pages/                    # Route handlers (page components)
│   │   ├── Dashboard.page.tsx
│   │   ├── AllRounds.page.tsx
│   │   ├── RoundsData.page.tsx
│   │   ├── AddNewRound.page.tsx
│   │   ├── Statistics.page.tsx
│   │   ├── Settings.page.tsx
│   │   ├── Clubs.page.tsx
│   │   ├── Player.page.tsx
│   │   ├── Login.page.tsx
│   │   ├── Error.page.tsx
│   │   ├── ProtectedRoute.page.tsx
│   │   └── SharedLayout.page.tsx
│   │
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Shared components
│   │   │   ├── header/
│   │   │   ├── spinner/
│   │   │   ├── ThemeSwitcher.component.tsx
│   │   │   └── shotPositions/
│   │   │
│   │   ├── Dashboard/            # Dashboard charts and player info
│   │   │   ├── Dashboard.component.tsx
│   │   │   └── components/
│   │   │       ├── Charts/
│   │   │       │   ├── ScoreChart.component.tsx
│   │   │       │   ├── FairwayChart.component.tsx
│   │   │       │   ├── GirChart.component.tsx
│   │   │       │   ├── PuttsChart.component.tsx
│   │   │       │   ├── ParAveragesChart.component.tsx
│   │   │       │   ├── PointsChart.component.tsx
│   │   │       │   └── ChartsMain.component.tsx
│   │   │       ├── Player/
│   │   │       └── EmptyRounds/
│   │   │
│   │   ├── Totals/               # Hole-by-hole statistics display
│   │   │   └── HolebyHole/
│   │   │       ├── HolebyHoleTotals.component.tsx
│   │   │       ├── Putts/
│   │   │       ├── TeeShots/
│   │   │       ├── Inside100mt/
│   │   │       ├── General/
│   │   │       ├── ChippingPitching/
│   │   │       ├── FairwayWoodAndIrons/
│   │   │       ├── DistancesTotals.component.tsx
│   │   │       └── components/
│   │   │           ├── StatDisplay.component.tsx
│   │   │           ├── TeeshotDispersion.component.tsx
│   │   │           ├── StackBlock.component.tsx
│   │   │           └── Cross.component.tsx
│   │   │
│   │   ├── NewRound/             # Round creation forms
│   │   │   ├── AddNewRound.component.tsx
│   │   │   ├── AddNewRoundForm.component.tsx
│   │   │   ├── AddSingleHole.component.tsx
│   │   │   ├── AddNewRoundHoles.component.tsx
│   │   │   ├── HolebyHoleTable.component.tsx
│   │   │   ├── PuttsGenerator.component.tsx
│   │   │   ├── RoundSave.component.tsx
│   │   │   └── components/
│   │   │       ├── NewRoundMainData.component.tsx
│   │   │       ├── HoleGeneralForm.component.tsx
│   │   │       ├── DistancesButton.component.tsx
│   │   │       ├── SaveRoundButton.component.tsx
│   │   │       └── Select.component.tsx
│   │   │
│   │   ├── Rounds/                # Rounds list management
│   │   │   ├── Rounds.component.tsx
│   │   │   ├── RoundsTable.component.tsx
│   │   │   └── RoundsButtons.component.tsx
│   │   │
│   │   ├── RoundsData/            # View round details
│   │   │   ├── RoundsDataMain.component.tsx
│   │   │   └── components/
│   │   │       ├── roundData/
│   │   │       └── shotsTable/
│   │   │
│   │   ├── Dialog/                # Modal dialogs
│   │   │   ├── HoleDetailsDialog.component.tsx
│   │   │   ├── TeeShotsDialog.component.tsx
│   │   │   ├── ApproachDialog.component.tsx
│   │   │   ├── PuttsInputDialog.component.tsx
│   │   │   ├── PenaltiesDialog.component.tsx
│   │   │   ├── ClubDistanceDialog.component.tsx
│   │   │   └── MissingShotsDialog.component.tsx
│   │   │
│   │   ├── Clubs/                 # Golf bag/clubs management
│   │   │   ├── ClubsMain.component.tsx
│   │   │   └── ClubsList.component.tsx
│   │   │
│   │   ├── Statistics/            # Statistics display
│   │   │   └── StatisticsMain.component.tsx
│   │   │
│   │   ├── Settings/              # Settings page
│   │   │   └── Settings.component.tsx
│   │   │
│   │   ├── LoginForm/             # Authentication forms
│   │   │   ├── SignupForm.component.tsx
│   │   │   ├── Signin.component.tsx
│   │   │   └── components/
│   │   │       ├── LoginForm.component.tsx
│   │   │       └── GoogleLoginButton.component.tsx
│   │   │
│   │   ├── Wizard/                # Setup wizards
│   │   │   ├── WizardSetupDialog.component.tsx
│   │   │   ├── PlayerSetupForm.component.tsx
│   │   │   └── ClubSetupForm.component.tsx
│   │   │
│   │   └── layout/                # Layout components
│   │       ├── MainLayout2.component.tsx
│   │       ├── User.component.tsx
│   │       └── Footer.component.tsx
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useDialog.hook.ts
│   │   ├── useHoleFormManager.component.tsx
│   │   ├── useTeeShotDetailsDialog.hook.tsx
│   │   ├── usePenaltiesDialog.hook.tsx
│   │   ├── useApproachDetailsDialog.hook.tsx
│   │   ├── usePuttsInputDialog.hook.tsx
│   │   ├── useNewHoleGeneralData.hook.tsx
│   │   ├── singleHoleCalculator.hook.tsx
│   │   ├── useLogin.hook.tsx
│   │   └── useDeviceDetection.hook.tsx
│   │
│   ├── store/                     # State management
│   │   └── zustand/
│   │       ├── app.store.ts       # Main Zustand store (793 lines)
│   │       └── index.ts
│   │
│   ├── utils/                     # Utility functions
│   │   ├── calculator/            # Golf calculations
│   │   │   ├── TotalsCalculator.utils.tsx
│   │   │   ├── AverageCalculator.utils.tsx
│   │   │   ├── math.utils.tsx
│   │   │   └── __tests__/
│   │   │
│   │   ├── firestore/             # Firestore service layer
│   │   │   ├── round.firestore.ts
│   │   │   ├── player.firestore.ts
│   │   │   └── user.firestore.ts
│   │   │
│   │   ├── firebase/              # Firebase configuration
│   │   │   ├── firebase.utils.tsx
│   │   │   ├── firebaseLogin.utils.tsx
│   │   │   └── firebaseSignup.utils.tsx
│   │   │
│   │   ├── shots/                 # Shot-level calculations
│   │   │   └── shots.utils.tsx
│   │   │
│   │   ├── totals/                # Totals aggregation
│   │   │   ├── totals.utils.tsx
│   │   │   └── totalsGenFunc.utils.tsx
│   │   │
│   │   ├── round/                 # Round utilities
│   │   │   └── round.utils.tsx
│   │   │
│   │   ├── storage/               # Storage utilities
│   │   │   └── localStorage.utils.tsx
│   │   │
│   │   ├── inputs/                # Input validation
│   │   │   └── ValidateInputs.utils.tsx
│   │   │
│   │   ├── deviceDetection.utils.ts
│   │   ├── fontLoader.utils.ts
│   │   ├── constant.utils.tsx
│   │   ├── number.utils.tsx
│   │   ├── strings.utils.tsx
│   │   ├── links.utils.tsx
│   │   └── axios/axiox.utils.tsx
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── user.types.tsx
│   │   ├── player.types.tsx
│   │   ├── clubs.types.tsx
│   │   ├── round.types.tsx
│   │   ├── roundData.types.tsx
│   │   ├── roundDetails.types.tsx
│   │   ├── roundTotals.types.tsx
│   │   ├── roundsTotals.types.tsx
│   │   ├── point.types.tsx
│   │   ├── charts.types.tsx
│   │   ├── props.types.tsx
│   │   ├── controls.types.tsx
│   │   └── general.types.tsx
│   │
│   ├── context/                   # React context providers
│   │   └── Theme.context.tsx
│   │
│   ├── enum/                      # TypeScript enums
│   │   └── shots.enum.tsx
│   │
│   ├── locales/                   # i18n translation files
│   │   ├── en.json
│   │   └── it.json
│   │
│   ├── assets/                    # Static assets
│   │   ├── CustomIcons.assets.tsx
│   │   └── icons8-golf-67.png
│   │
│   ├── dev-tools/                 # Development/testing utilities
│   │   ├── testRunner.ts
│   │   ├── testDataGenerator.ts
│   │   ├── stepByStepTester.ts
│   │   ├── edgeCaseTests.ts
│   │   ├── mockShotData.ts
│   │   ├── demo.ts
│   │   └── README.md
│   │
│   └── styles/                    # Styling utilities
│       └── ThemeSetup.styles.tsx
│
├── public/
│   └── logo192.png
│
└── .github/workflows/
    └── node_version.yaml         # CI configuration
```

## Directory Purposes

**src/pages/:**
- Purpose: Route handlers - orchestrator components that compose pages
- Contains: Page components named `.page.tsx` suffix
- Key files: `Dashboard.page.tsx`, `AllRounds.page.tsx`, `RoundsData.page.tsx`, `AddNewRound.page.tsx`

**src/components/:**
- Purpose: Reusable UI building blocks
- Contains: Feature-grouped subdirectories (Dashboard, Totals, NewRound, etc.)
- Key files: Large feature components and their sub-components

**src/hooks/:**
- Purpose: Encapsulated business logic and UI state
- Contains: Custom hooks for form handling, dialogs, calculations
- Key files: `useHoleFormManager.component.tsx`, `useDialog.hook.ts`

**src/store/zustand/:**
- Purpose: Global state management
- Contains: Single Zustand store with persist middleware
- Key files: `app.store.ts` (793 lines - central state hub)

**src/utils/:**
- Purpose: Pure functions and external service integrations
- Contains: Calculator functions, Firestore services, Firebase config
- Key files: `TotalsCalculator.utils.tsx`, `round.firestore.ts`, `shots.utils.tsx`

**src/types/:**
- Purpose: TypeScript type definitions
- Contains: Domain types (rounds, players, shots, totals)
- Key files: `roundData.types.tsx` (IShots interface), `roundTotals.types.tsx`

**src/context/:**
- Purpose: React context providers
- Contains: Theme context for MUI theming

**src/dev-tools/:**
- Purpose: Development and testing utilities
- Contains: Custom test runner, data generators, step-by-step debugger

## Key File Locations

**Entry Points:**
- `src/index.tsx`: React DOM entry point
- `src/App.tsx`: Router and theme setup

**Configuration:**
- `src/store/zustand/app.store.ts`: Global state (central)
- `src/utils/firebase/firebase.utils.tsx`: Firebase initialization

**Core Logic:**
- `src/utils/calculator/TotalsCalculator.utils.tsx`: Round totals aggregation
- `src/utils/shots/shots.utils.tsx`: Shot-level calculations (GIR, putts, etc.)
- `src/utils/firestore/round.firestore.ts`: Round persistence

**Testing:**
- `src/dev-tools/testRunner.ts`: Custom golf calculation test runner

## Naming Conventions

**Files:**
- Components: `PascalCase.component.tsx` (e.g., `Dashboard.component.tsx`)
- Hooks: `camelCase.hook.ts` or `camelCase.hook.tsx` (e.g., `useDialog.hook.ts`)
- Utils: `camelCase.utils.tsx` (e.g., `TotalsCalculator.utils.tsx`)
- Types: `PascalCase.types.tsx` (e.g., `roundData.types.tsx`)
- Pages: `PascalCase.page.tsx` (e.g., `Dashboard.page.tsx`)

**Directories:**
- All lowercase, hyphenated (e.g., `holebyHole`, `firestore`, `calculator`)

**TypeScript Types:**
- Interfaces: `I` prefix (e.g., `IShots`, `IPlayerStateData`, `IRoundTotals`)
- Types: No prefix (e.g., `InitialStateRounds`, `AppState`)

**State:**
- Store hooks: `useAppStore`
- State properties: camelCase with descriptive suffixes (`isLoadingPlayer`, `roundsList`)

## Where to Add New Code

**New Feature Page:**
- Primary code: `src/pages/{FeatureName}.page.tsx`
- Components: `src/components/{FeatureName}/`
- Hooks: `src/hooks/`

**New Component:**
- Implementation: `src/components/{Domain}/{ComponentName}.component.tsx`

**New Utility:**
- Calculations: `src/utils/calculator/`
- API calls: `src/utils/firestore/`
- Helpers: `src/utils/`

**New Type:**
- Types: `src/types/{Domain}.types.tsx`

**New Test:**
- Unit tests: `src/utils/calculator/__tests__/`
- Custom tests: `src/dev-tools/`

## Special Directories

**dev-tools/:**
- Purpose: Custom testing framework for golf calculations
- Generated: No
- Committed: Yes - part of development workflow

**locales/:**
- Purpose: i18n - currently English and Italian
- Generated: No
- Committed: Yes

**context/:**
- Purpose: React context for theme
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-05-17*