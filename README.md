# Disney Pixar Cars — Steam Game Promotional Hub

A cinematic promotional landing page for Disney Pixar Cars & Cars 2 on Steam. Features an interactive 3D car showroom (Three.js via TresJS), a CMS-style admin panel for managing all content, character catalog with skins & audio, gameplay video showcase, news system, and game specs comparison.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Frontend Pages](#frontend-pages)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [File Upload System](#file-upload-system)
- [Auth System](#auth-system)
- [Environment Variables](#environment-variables)

---

## Features

### Public Website
- **Interactive 3D Showroom** — TresJS/Cientos-powered car model viewer with 360° spin, skin switching, and camera controls
- **Character Catalog** — filterable grid with category tabs, search, and dedicated detail pages per character
- **Character Detail Pages** — 3D model viewer, skin selector, audio triggers (engine sounds, voice quotes), telemetry dashboard, trivia card
- **Gameplay Video Showcase** — YouTube video player with playlist grid, category filtering
- **Community News** — article listing with featured highlight, search, rich-text article detail pages
- **Game Identity & Specs** — side-by-side comparison of Cars (2006) vs Cars 2 (2011) with system requirements
- **Legendary Tracks Carousel** — scrollable circuit cards with ambient color theming
- **Cinematic Trailer Modal** — embedded trailer player
- **Responsive Design** — mobile-first Tailwind CSS with custom Cars-themed color palette and typography
- **Scroll Animations** — AOS (Animate on Scroll) integration
- **SEO Optimized** — meta tags, Open Graph, Twitter cards, sitemap, robots.txt

### Admin CMS Panel
- **Dashboard** — overview stats, quick actions, recent entries, database resync button
- **Character Management** — full CRUD with file upload for 3D models (.glb), cover images, audio files, skin management
- **News Management** — full CRUD with TipTap rich-text editor, featured toggle, image upload
- **Track Management** — full CRUD with ambient color picker, rich-text descriptions
- **Game Specs Management** — edit system requirements for Cars & Cars 2
- **Gameplay Video Management** — full CRUD with YouTube URL auto-parsing
- **File Upload System** — direct file upload to `public/` with old file cleanup
- **JWT Authentication** — httpOnly cookie-based session with access + refresh tokens
- **Protected Routes** — global middleware guards all `/admin/*` routes

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Nuxt 4](https://nuxt.com) (Vue 3 + TypeScript) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) with custom theme |
| **3D Rendering** | [Three.js](https://threejs.org) via [@tresjs/nuxt](https://tresjs.org) + [@tresjs/cientos](https://cientos.tresjs.org) |
| **Rich Text Editor** | [TipTap](https://tiptap.dev) (Vue 3) |
| **Database** | [Prisma](https://prisma.io) ORM + [Turso](https://turso.tech) (libSQL) / SQLite fallback |
| **Auth** | JWT (jsonwebtoken) + bcryptjs, httpOnly cookies |
| **Animations** | [GSAP](https://gsap.com) + [AOS](https://michalsnik.github.io/aos/) |
| **Icons** | [Bootstrap Icons](https://icons.getbootstrap.com) (nuxt-bootstrap-icons) |
| **SEO** | @nuxtjs/sitemap + @nuxtjs/robots |
| **Module** | ES Modules (`"type": "module"`) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd carsgame

# Install dependencies
npm install
```

### Database Setup

The project uses **Prisma** with **Turso** (libSQL) in production, with a local SQLite fallback at `prisma/dev.db`.

**Option A — Standalone scripts (recommended for fresh Turso setup):**

```bash
# Create tables + default admin user (admin/admin123)
node scripts/init-db.js

# Seed all static data (characters, news, tracks, specs, videos)
node scripts/seed-data.js
```

**Option B — Auto-seeding:**

The login endpoint automatically seeds the database if the User table is empty. Just start the dev server and navigate to `/admin/login` — the first login attempt triggers seeding.

### Development Server

```bash
npm run dev
# → http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
carsgame/
├── app/                          # Nuxt 4 app directory (all frontend code)
│   ├── app.vue                   # Root app component
│   ├── assets/css/main.css       # Global styles
│   ├── components/               # Auto-imported Vue components
│   │   ├── admin/                # Admin-specific components
│   │   │   ├── FileUpload.vue    # Reusable file upload with v-model
│   │   │   ├── WysiwygEditor.vue # TipTap rich-text editor
│   │   │   ├── AdminModal.vue    # Confirmation modal
│   │   │   ├── AdminSidebar.vue  # Admin navigation sidebar
│   │   │   ├── AdminHeader.vue   # Admin page header
│   │   │   └── AdminToast.vue    # Toast notifications
│   │   ├── characters/           # Character-related components
│   │   ├── character-detail/     # Character detail page components
│   │   ├── home/                 # Homepage section components
│   │   ├── news/                 # News listing components
│   │   ├── news-detail/          # News detail page components
│   │   ├── gameplay/             # Gameplay video components
│   │   ├── showroom/             # 3D showroom components
│   │   ├── tracks/               # Track carousel components
│   │   ├── identity/             # Game identity/specs components
│   │   ├── ThreeShowroom.vue     # Showroom orchestrator
│   │   ├── ModelViewer3D.vue     # Interactive 3D model viewer
│   │   ├── CarSkeleton3D.vue     # 3D loading skeleton (Three.js primitives)
│   │   ├── CarSkeletonLoader.vue # 2D CSS loading placeholder
│   │   ├── CharacterCard.vue     # Character grid card
│   │   ├── TrackCarousel.vue     # Tracks carousel
│   │   ├── TrailerModal.vue      # Trailer video modal
│   │   ├── Navbar.vue            # Main navigation bar
│   │   └── Footer.vue            # Site footer
│   ├── composables/              # Vue composables (shared logic)
│   │   ├── useAuth.ts            # Authentication state & actions
│   │   ├── useCmsData.ts         # CMS data fetching with fallback
│   │   ├── useCarAudio.ts        # Car audio playback
│   │   └── useToast.ts           # Toast notification state
│   ├── data/                     # Static TypeScript data (API fallback)
│   │   ├── characters.ts         # 19 characters with skins
│   │   ├── news.ts               # News articles
│   │   ├── tracks.ts             # Track circuits
│   │   └── gameInfo.ts           # Game specs + gameplay videos
│   ├── layouts/                  # Page layouts
│   │   ├── default.vue           # Public website layout
│   │   └── admin.vue             # Admin panel layout (sidebar + header)
│   ├── middleware/
│   │   └── auth.global.ts        # Global auth middleware (guards /admin/*)
│   ├── pages/                    # File-based routing
│   │   ├── index.vue             # Homepage
│   │   ├── gameplay.vue          # Gameplay videos
│   │   ├── identity.vue          # Game specs comparison
│   │   ├── characters/           # Character pages
│   │   ├── news/                 # News pages
│   │   └── admin/                # Admin CMS pages
│   └── types/
│       └── index.ts              # Shared TypeScript interfaces
├── server/                       # Nuxt server engine
│   ├── api/                      # File-based API routes
│   │   ├── auth/                 # Login, logout, session
│   │   ├── characters/           # Character CRUD
│   │   ├── news/                 # News CRUD
│   │   ├── tracks/               # Track CRUD
│   │   ├── specs/                # Game specs (read + update only)
│   │   ├── gameplay/             # Gameplay video CRUD
│   │   ├── seed.post.ts          # Database seeding trigger
│   │   └── upload.post.ts        # Multipart file upload
│   └── utils/                    # Server-side utilities
│       ├── prisma.ts             # Lazy PrismaClient with libSQL adapter
│       ├── jwt.ts                # JWT sign/verify
│       ├── protect.ts            # Auth guard helper
│       ├── seedData.ts           # Prisma-based seeding
│       └── characterHelper.ts    # DB row → API format transformer
├── prisma/
│   └── schema.prisma             # Database schema (SQLite/Turso)
├── scripts/
│   ├── init-db.js                # Raw DDL table creation + admin user
│   └── seed-data.js              # Raw libSQL data seeding
├── public/                       # Static assets (served at /)
│   ├── models/                   # .glb 3D model files (20 files)
│   ├── audio/                    # .mp3 sound effects (8 files)
│   ├── images/
│   │   ├── cars/                 # Character cover images (.png)
│   │   └── games-cover/          # Game cover images
│   └── logo.png
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.js            # Tailwind custom theme
├── tsconfig.json                 # TypeScript config (references .nuxt)
├── package.json
└── .env                          # Environment variables (committed)
```

---

## Architecture Overview

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                     PUBLIC PAGES                         │
│                                                         │
│  useCmsData() ──→ $fetch('/api/...') ──→ Database       │
│       │                                    (Prisma)     │
│       │ fallback on error/empty                         │
│       └────→ app/data/*.ts (static TypeScript)          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                     ADMIN CMS                           │
│                                                         │
│  Admin Forms ──→ $fetch('/api/...') ──→ Database        │
│       │           (POST/PUT/DELETE)     (Prisma)        │
│       │                                                 │
│  FileUpload ──→ $fetch('/api/upload') ──→ public/       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                     SERVER API                          │
│                                                         │
│  Nuxt Server Engine (file-based routing)                │
│  ├── Auth: JWT httpOnly cookies (access + refresh)      │
│  ├── CRUD: characters, news, tracks, specs, gameplay    │
│  ├── Upload: multipart file → public/                   │
│  └── Seed: auto-seed on empty DB or manual trigger      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                     DATABASE                            │
│                                                         │
│  Prisma ORM ──→ Turso (libSQL) in production           │
│               ──→ SQLite file (prisma/dev.db) locally   │
│                                                         │
│  Standalone scripts (scripts/) bypass Prisma            │
│  and use @libsql/client directly for Turso setup        │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Static Fallback Pattern** — Every API endpoint falls back to static data from `app/data/` on error. This means the site works without a database (useful for development and demo).

2. **Dual Seeding Paths** — `scripts/init-db.js` + `scripts/seed-data.js` use raw libSQL for direct Turso setup. `server/utils/seedData.ts` uses Prisma for auto-seeding on first login. Both read from the same `app/data/` sources.

3. **File Upload to Public/** — Files are uploaded directly to `public/` subdirectories. Paths stored in the database are root-relative (e.g., `/models/mcqueen.glb`), which Nuxt serves automatically.

4. **Global Auth Middleware** — A single `auth.global.ts` middleware checks the session on every navigation and redirects unauthenticated users away from `/admin/*` routes.

---

## Frontend Pages

### Public Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `pages/index.vue` | Homepage — hero banner, 3D showroom, tracks carousel, trailer, game overview, Steam CTA |
| `/characters` | `pages/characters/index.vue` | Character catalog — category filter tabs, search, responsive grid |
| `/characters/:slug` | `pages/characters/[slug].vue` | Character detail — 3D model viewer, skin selector, audio triggers, telemetry, trivia |
| `/news` | `pages/news/index.vue` | News listing — featured article highlight, search, article grid |
| `/news/:id` | `pages/news/[id].vue` | News detail — article header, rich-text body, reaction bar, Steam CTA |
| `/gameplay` | `pages/gameplay.vue` | Gameplay showcase — featured video player, video playlist grid |
| `/identity` | `pages/identity.vue` | Game identity — side-by-side Cars vs Cars 2, system requirements comparison |

### Admin Pages

| Route | File | Description |
|-------|------|-------------|
| `/admin/login` | `pages/admin/login.vue` | Admin login form (no layout) |
| `/admin` | `pages/admin/index.vue` | CMS dashboard — stats, quick actions, recent entries, DB resync |
| `/admin/characters` | `pages/admin/characters/index.vue` | Character list — search, category filter, delete |
| `/admin/characters/new` | `pages/admin/characters/new.vue` | Create character form (5 sections) |
| `/admin/characters/:id` | `pages/admin/characters/[id].vue` | Edit character form (pre-populated) |
| `/admin/news` | `pages/admin/news/index.vue` | News list — search, featured toggle, delete |
| `/admin/news/new` | `pages/admin/news/new.vue` | Create news form (TipTap editor) |
| `/admin/news/:id` | `pages/admin/news/[id].vue` | Edit news form |
| `/admin/tracks` | `pages/admin/tracks/index.vue` | Track list — delete |
| `/admin/tracks/new` | `pages/admin/tracks/new.vue` | Create track form |
| `/admin/tracks/:id` | `pages/admin/tracks/[id].vue` | Edit track form |
| `/admin/specs` | `pages/admin/specs/index.vue` | Game specs overview (2 games) |
| `/admin/specs/:id` | `pages/admin/specs/[id].vue` | Edit game spec form |
| `/admin/gameplay` | `pages/admin/gameplay/index.vue` | Gameplay video list — delete |
| `/admin/gameplay/new` | `pages/admin/gameplay/new.vue` | Create gameplay video form |
| `/admin/gameplay/:id` | `pages/admin/gameplay/[id].vue` | Edit gameplay video form |

---

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | No | Login with username + password. Sets httpOnly cookies. Auto-seeds DB if empty. |
| `POST` | `/api/auth/logout` | No | Logout. Clears cookies. |
| `GET` | `/api/auth/session` | No | Get current session from cookies. Auto-refreshes expired tokens. |

**POST `/api/auth/login`**

Request body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login berhasil",
  "user": {
    "id": "admin_user_01",
    "username": "admin",
    "name": "Administrator",
    "role": "ADMIN",
    "isLogin": true
  }
}
```

---

### Characters

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/characters` | No | List all characters (optional `?category=` and `?search=` filters) |
| `GET` | `/api/characters/:id` | No | Get single character by ID or slug |
| `POST` | `/api/characters` | Yes | Create new character |
| `PUT` | `/api/characters/:id` | Yes | Update character (partial update) |
| `DELETE` | `/api/characters/:id` | Yes | Delete character + associated files from `public/` |

**GET `/api/characters`**

Query parameters:
- `category` (string, optional) — filter by category slug (e.g., `piston-cup`)
- `search` (string, optional) — search across name, title, sponsor, categoryLabel

**POST `/api/characters`**

Request body:
```json
{
  "name": "Lightning McQueen",
  "racingNumber": "95",
  "title": "7x Piston Cup Champion",
  "tagline": "Ka-Chow! Speed. I am speed.",
  "category": "piston-cup",
  "categoryLabel": "Piston Cup Champion",
  "modelFile": "/models/mcqueen.glb",
  "coverUrl": "/images/cars/mcqueen.png",
  "scale": 0.95,
  "primaryColor": "#E11D2A",
  "accentColor": "#FFC700",
  "topSpeed": 200,
  "sponsor": "Rust-eze",
  "engineType": "Full-race V8 Engine",
  "voiceQuote": "Ka-Chow!",
  "soundEffect": "/audio/ka-chow.mp3",
  "bio": "Lightning McQueen is a red race car...",
  "funFact": "McQueen was named after Glen Jr. and John Henry...",
  "skins": [
    {
      "name": "Dinoco Blue",
      "modelFile": "/models/dinoco_lightning_mcqueen.glb",
      "previewColor": "#00A3E0",
      "description": "Dinoco sponsorship skin"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "Karakter berhasil ditambahkan",
  "data": {
    "id": "lightning-mcqueen",
    "slug": "lightning-mcqueen",
    "name": "Lightning McQueen",
    "modelFile": "/models/mcqueen.glb",
    "skins": [...],
    "stats": { "topSpeed": 200 },
    ...
  }
}
```

**PUT `/api/characters/:id`**

Request body: Same fields as POST, all optional (partial update). If `skins` array is provided, all existing skins are replaced.

**DELETE `/api/characters/:id`**

Deletes the character and associated files (`modelFile`, `coverUrl`, `soundEffect`, skin `modelFile`) from `public/`.

---

### News

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/news` | No | List all news (optional `?search=` and `?featured=true` filters) |
| `GET` | `/api/news/:id` | No | Get single news by ID or slug |
| `POST` | `/api/news` | Yes | Create news article |
| `PUT` | `/api/news/:id` | Yes | Update news article |
| `DELETE` | `/api/news/:id` | Yes | Delete news article |

**POST `/api/news`**

Request body:
```json
{
  "title": "Cars 3 Update Released",
  "excerpt": "New content drop includes...",
  "content": "<p>Full HTML content here...</p>",
  "author": "Admin",
  "date": "2026-09-12",
  "image": "/images/news/cars3-update.jpg",
  "isFeatured": true
}
```

---

### Tracks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/tracks` | No | List all tracks (ordered by `order`) |
| `GET` | `/api/tracks/:id` | No | Get single track by ID |
| `POST` | `/api/tracks` | Yes | Create track |
| `PUT` | `/api/tracks/:id` | Yes | Update track |
| `DELETE` | `/api/tracks/:id` | Yes | Delete track |

**POST `/api/tracks`**

Request body:
```json
{
  "name": "Radiator Springs",
  "surfaceType": "Asphalt",
  "description": "The legendary hometown circuit...",
  "image": "/images/tracks/radiator-springs.jpg",
  "ambientColor": "#E11D2A"
}
```

---

### Game Specs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/specs` | No | List all game specs (Cars 1 & Cars 2) |
| `GET` | `/api/specs/:id` | No | Get spec by ID (`cars-1` or `cars-2`) |
| `PUT` | `/api/specs/:id` | Yes | Update game spec (no create/delete) |

**PUT `/api/specs/:id`**

Request body:
```json
{
  "title": "Disney•Pixar Cars",
  "releaseYear": 2006,
  "developer": "Rainbow Studios",
  "publisher": "THQ",
  "genre": "Racing",
  "steamAppId": "12750",
  "steamUrl": "https://store.steampowered.com/app/12750",
  "coverUrl": "/images/games-cover/cars-1.jpg",
  "summary": "Race as Lightning McQueen...",
  "os": "Windows XP/Vista",
  "processor": "1.8 GHz",
  "memory": "512 MB RAM",
  "graphics": "64 MB DirectX 9.0c",
  "directx": "9.0c",
  "storage": "2 GB"
}
```

---

### Gameplay Videos

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/gameplay` | No | List all videos (ordered by `order`) |
| `GET` | `/api/gameplay/:id` | No | Get single video by ID |
| `POST` | `/api/gameplay` | Yes | Create video entry |
| `PUT` | `/api/gameplay/:id` | Yes | Update video entry |
| `DELETE` | `/api/gameplay/:id` | Yes | Delete video entry |

**POST `/api/gameplay`**

Request body:
```json
{
  "title": "Lightning McQueen Racing",
  "category": "High-Speed Racing",
  "youtubeId": "dQw4w9WgXcQ",
  "duration": "03:45",
  "game": "Disney•Pixar Cars",
  "description": "Epic racing moments..."
}
```

Note: `youtubeId` accepts full YouTube URLs — the ID is extracted automatically.

---

### Utility Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/seed` | No | Trigger database seeding. Body: `{ "force": true }` to re-seed existing data. |
| `POST` | `/api/upload` | Yes | Multipart file upload. See [File Upload System](#file-upload-system). |

---

## Database Schema

**6 models** defined in `prisma/schema.prisma`:

| Model | Description |
|-------|-------------|
| `User` | Admin users (id, username, email, password, name, role) |
| `Character` | Cars characters with 3D model paths, colors, stats, bios |
| `CharacterSkin` | Alternative skins per character (linked via `characterId`) |
| `News` | News articles with slug, content (HTML), featured flag |
| `TrackCircuit` | Race tracks with surface type, ambient color |
| `GameSpec` | Game system requirements (Cars 1 & Cars 2) |
| `GameplayVideo` | YouTube video entries with category, duration |

Key relationships:
- `Character` 1:N `CharacterSkin` (cascade delete)
- Skin IDs use format `{characterId}_{skinId}`
- `positionOffset` / `rotationOffset` stored as JSON strings in DB, parsed in `characterHelper.ts`

---

## File Upload System

**Endpoint:** `POST /api/upload` (auth-protected)

**Request:** Multipart form data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | The file to upload |
| `folder` | string | No | Target subdirectory (default: `models`) |
| `oldPath` | string | No | Existing file path to delete after upload |

**Allowed folders and extensions:**

| Folder | Extensions |
|--------|-----------|
| `models` | `.glb`, `.gltf` |
| `images/cars` | `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg` |
| `images/games-cover` | `.png`, `.jpg`, `.jpeg`, `.webp` |
| `audio` | `.mp3`, `.wav`, `.ogg`, `.m4a` |

**Behavior:**
- Filenames are sanitized and prefixed with a timestamp (`1694567890-mcqueen.glb`)
- If `oldPath` is provided and differs from the new path, the old file is deleted
- Character delete endpoints also clean up associated files from `public/`

**Frontend component:** `FileUpload.vue` (`app/components/admin/`) provides v-model integration for admin forms.

---

## Auth System

- **JWT tokens** stored as httpOnly cookies (`access_token`: 1 day, `refresh_token`: 7 days)
- **Password hashing** via bcryptjs (10 rounds)
- **Session endpoint** auto-refreshes expired access tokens using refresh tokens
- **Global middleware** (`app/middleware/auth.global.ts`) checks session on every navigation
- **Admin layout** (`app/layouts/admin.vue`) wraps all admin pages with sidebar + header
- **Default credentials:** `admin` / `admin123`

---

## Environment Variables

Defined in `.env` (committed for this project):

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret key for JWT signing (default: `aretha`) |
| `TURSO_DATABASE_URL` | Turso database URL |
| `TURSO_DATABASE_AUTH` | Turso auth token |

When `TURSO_DATABASE_URL` is not set, Prisma falls back to local SQLite at `prisma/dev.db`.
