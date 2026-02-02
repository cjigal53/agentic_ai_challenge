# Issue #8: Initial Next.js Project Setup with Testing Infrastructure

## Issue
https://github.com/cjigal53/agentic_ai_challenge/issues/8

## Overview
Set up complete Next.js 14+ project with TypeScript, Tailwind CSS, and comprehensive testing infrastructure. This provides the foundation for building the Todo App following agentic AI development practices.

## Requirements

### Functional Requirements
- Next.js 14+ with App Router
- TypeScript with strict mode enabled
- Tailwind CSS with dark mode support
- Jest + React Testing Library for testing
- ESLint with Next.js recommended rules
- Basic homepage with project title
- Project structure following Next.js conventions

### Non-Functional Requirements
- Build time < 30 seconds
- Zero TypeScript errors
- All tests passing
- Vercel-ready configuration
- Responsive design from the start

## Approach

### 1. Project Configuration

**package.json**:
- Next.js 14.2+
- React 18+
- TypeScript 5.4+
- Tailwind CSS 3.4+
- Jest + React Testing Library
- Testing utilities

**tsconfig.json**:
- Strict mode enabled
- Path aliases (@/* → ./*)
- Next.js plugin configured

**Tailwind Configuration**:
- Content paths for all component directories
- Dark mode: class-based
- Custom color variables

### 2. Directory Structure

```
/
├── .claude/              # Already exists
├── specs/                # Already exists
├── tests/
│   └── setup.ts          # Jest setup
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Tailwind + custom styles
├── components/
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature components
└── lib/
    └── utils.ts          # Utility functions
```

### 3. Testing Setup

**Jest Configuration**:
- TypeScript support via ts-jest
- React Testing Library integration
- Module path mapping matching tsconfig
- Coverage collection
- Test environment: jsdom

**Test Utilities**:
- Custom render function with providers
- Mock utilities
- Test helpers

### 4. Initial Components

**RootLayout** (`app/layout.tsx`):
- HTML structure
- Metadata (title, description)
- Global CSS import
- Dark mode support via className

**Homepage** (`app/page.tsx`):
- Project title: "Todo App"
- Subtitle about agentic workflow
- Simple, centered layout
- Responsive design

### 5. Styling Approach

- Tailwind utility classes
- Dark mode with `dark:` variants
- CSS variables for theming
- Mobile-first responsive design

## Acceptance Criteria

- [x] package.json created with all dependencies
- [x] tsconfig.json configured with strict mode
- [x] Tailwind CSS configured with dark mode
- [x] Jest + RTL configured and working
- [x] Project structure created
- [x] Root layout with metadata
- [x] Homepage with project title
- [x] Build succeeds: `npm run build`
- [x] Type check passes: `npm run type-check`
- [x] Tests executable: `npm test`
- [x] Vercel deployment ready

## Testing Plan

### Configuration Tests
1. Verify TypeScript compiles without errors
2. Verify build completes successfully
3. Verify test runner executes

### Component Tests
1. Homepage renders correctly
2. Page title is present
3. Responsive layout works
4. Dark mode classes applied

### Manual Testing
1. Run dev server: `npm run dev`
2. Visit http://localhost:3000
3. Verify content displays
4. Toggle system dark mode
5. Verify responsive on mobile/desktop

## Implementation Notes

- Use npm (not yarn or pnpm) for consistency
- Follow Next.js 14 App Router conventions
- Server Components by default
- Client Components only when needed (interactivity)
- Keep dependencies minimal
- Focus on foundation, not features

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^14.1.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0"
  }
}
```

## Success Criteria

✅ All acceptance criteria met
✅ Zero build errors
✅ Zero TypeScript errors
✅ All tests passing
✅ Ready for feature development
