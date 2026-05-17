# PGS - Personal Golf Score

PGS (Personal Golf Score) is a comprehensive application for tracking golf rounds, shots, and detailed statistics. It allows users to register, log in, and record their golf games with granular detail, including shot outcomes, distances, penalties, putts, and sand saves.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite 8, TypeScript 6
- **UI Library**: Material UI (MUI)
- **State Management**: Zustand (with persist middleware)
- **Backend/Auth**: Firebase (Authentication & Firestore)
- **Testing**: Vitest & Custom Golf Calculation Testing Framework

## 🛠️ Setup and Installation

### Prerequisites
- **Node.js**: v2tan.0 (refer to `.nvmrc`)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables. Create a `.env` file in the root directory and add your Firebase credentials (ensure this file is not committed to version control).

## 💻 Development Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run type-check` | Performs TypeScript validation |
| `npm run test` | Runs Vitest unit tests |
| `npm run test:calc:quick` | Runs a quick 3-hole calculation test |
| `npm run test:calc:edge` | Runs edge case calculation tests |
| `npm run test:calc:all` | Runs the full calculation test suite |

## 🧪 Testing Approach

This project utilizes a specialized golf calculation testing framework located in `src/dev-tools/` to ensure the accuracy of scoring logic:

- `testRunner.ts`: The test orchestrator.
- `testDataGenerator.ts`: Generates synthetic test round data.
- `stepByStepTester.ts`: Enables hole-by-hole calculation debugging.
- `edgeCaseTests.ts`: Contains known edge cases for verification.

**Recommendation**: Always run `npm run test:calc:quick` first to validate any calculation-related fixes.

## 🏗️ Architecture

- **Entry Point**: `src/main.tsx`
- **Pages**: `src/pages/`
- **Components**: `src/components/`
- **Hooks**: `src/hooks/`
- **Types**: `src/types/`
- **Path Aliases**: Uses `@/` for clean imports (configured in `tsconfig.json` and `vite.config.ts`).

## 📝 Notes
- The custom calculation tests (`test:calc:*`) are the primary source of truth for scoring logic verification.
- Code style is enforced via Prettier.
