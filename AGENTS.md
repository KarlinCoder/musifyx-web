# AGENTS.md - Musify-X Web

## Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm dev:host    # Start with host exposure
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
```

**No test command** - project has no test suite.

## Tech Stack

- Next.js 16 (App Router) with React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (browser runtime, NOT pre-compiled)
- pnpm package manager

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── app/               # Authenticated app (/app/*)
│   │   ├── _components/   # Shared components for this route group
│   │   ├── _stores/       # Zustand stores
│   │   ├── _types/        # TypeScript types
│   │   ├── _lib/          # Utilities & services
│   │   └── ia/            # IA chat page (has own _components)
│   ├── (auth)/            # Auth routes (login, signup)
│   └── page.tsx           # Public home page
├── components/            # Shared UI components (TrackCard, AlbumCard, etc.)
├── hooks/                 # Custom hooks
├── lib/                   # Utils, supabase client
├── services/              # API services (deezer)
├── stores/                # Global zustand stores
└── types/                 # Global types
```

## Key Patterns

- **Page components** go in `src/app/app/` with `_components`, `_stores`, `_types`, `_lib` alongside
- **Shared components** go in `src/components/`
- **API services** in `src/services/` (deezer.ts, download.ts)
- Components use `use client` for client-side logic
- Use `@/` alias for `src/` imports (configured in tsconfig.json)

## Style

- Tailwind v4 uses `@theme` directive in `globals.css` for custom tokens
- Use existing cards: `TrackCard`, `AlbumCard`, `ArtistCard`, `PlaylistCard`
- Scrollbar style: `.styled-scrollbar` class
- Fonts: `font-primary` (Deezer), `font-secondary` (Inter)

## Lint & Typecheck

```bash
pnpm lint    # ESLint (eslint.config.mjs)
npx tsc      # TypeScript (no --noEmit flag needed, runs directly)
```

## Environment

- Clerk for authentication (requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
- Supabase for database (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Deezer API proxy via `/api/deezer` routes

## Known Issues

- TypeScript errors in existing files (artistId type mismatch, missing modules) - pre-existing, not caused by new changes
- No test suite exists