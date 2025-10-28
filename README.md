# Player360 Web

React + Vite + Tailwind frontend for Player360.

This is the source code for:

* Coach dashboard (attendance, performance ratings, recap, weekly review)
* Parent portal (read-only view of their child's attendance, performance, and risk flags)
* Auth flow (JWT stored in localStorage)

All data fetching/updates live in reusable hooks so we can reuse them later in React Native / Expo.

---

## Tech Stack

* React (with TypeScript)
* Vite
* Tailwind CSS
* React Router
* React Query-style hooks (TanStack Query pattern; fetch logic and cache centralized)
* LocalStorage for auth token & user info

---

## Project Structure

```txt
Player360-Web/
├─ src/
│  ├─ App.tsx                    # Router configuration
│  ├─ main.tsx                   # App bootstrap
│  ├─ index.css                  # Tailwind base styles
│  ├─ context/
│  │   └─ AuthContext.tsx        # AuthProvider, login(), logout(), JWT storage
│  ├─ lib/
│  │   ├─ api.ts                 # apiFetch helper (attaches Authorization header)
│  │   └─ protectedRoute.tsx     # <ProtectedRoute> wrapper
│  ├─ components/
│  │   ├─ TopNav.tsx             # Navbar / header
│  │   └─ DashboardCard.tsx      # Simple stat card used in dashboard
│  ├─ hooks/
│  │   ├─ useTodaySession.ts     # GET /sessions/daily (dashboard summary)
│  │   ├─ useAttendance.ts       # GET/POST attendance
│  │   ├─ usePerformance.ts      # GET/POST player ratings
│  │   ├─ useRecap.ts            # GET /sessions/:sessionId/recap
│  │   ├─ useWeeklyReview.ts     # GET /sessions/weekly-review
│  │   └─ useParentOverview.ts   # GET /parent/overview
│  ├─ routes/
│  │   ├─ LoginPage.tsx
│  │   ├─ DashboardPage.tsx
│  │   ├─ AttendancePage.tsx
│  │   ├─ PerformancePage.tsx
│  │   ├─ RecapPage.tsx
│  │   ├─ WeeklyReviewPage.tsx
│  │   └─ ParentOverviewPage.tsx
│  └─ ...
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ .gitignore
```

Key pages:

* `/login` (public)
* `/` (coach dashboard)
* `/attendance?sessionId=...`
* `/performance?sessionId=...`
* `/recap?sessionId=...`
* `/weekly`
* `/parent`

---

## Auth Flow

1. User logs in through `LoginPage.tsx`

   * `POST /auth/login`
   * Server responds with `{ token, user: { id, name, role } }`
2. We call `login(token, user)` from `AuthContext`

   * Save to `localStorage` as `p360_token` and `p360_user`
3. `<ProtectedRoute>` checks if token exists; if not, redirect to `/login`
4. Every data hook uses `apiFetch()` which automatically attaches:

   * `Authorization: Bearer <p360_token>`

The role (`coach` / `parent`) lives in `user.role`.
Pages like ParentOverviewPage show UI based on that role.

---

## Local Development (frontend only)

During *pure frontend development mode* (like storybooking UI or improving layout):

1. Install deps:

   ```bash
   npm install
   ```

2. Set the backend URL so frontend knows where to call:

   * In `src/lib/api.ts`, `BASE_URL` should point to your running backend.
     Example:

     ```ts
     export const BASE_URL = "http://localhost:5000";
     ```

     or if you deployed the API somewhere:

     ```ts
     export const BASE_URL = "https://player360.myserver.com";
     ```

3. Run dev server:

   ```bash
   npm run dev
   ```

   This will start Vite (default port 5173).

4. Open browser at the printed Vite URL (e.g. `http://localhost:5173`).

**Note:** In production / demo, we don't actually run Vite in the cloud.
Instead we build static files and either:

* serve them via Nginx, OR
* copy the build into the backend's `public/` folder and let Express serve it.

---

## Building for Production

When you're ready to ship static assets:

1. Set `BASE_URL` in `src/lib/api.ts` to the *public backend URL* (or just `""` if you're letting Express serve same-origin API).

2. Build:

   ```bash
   npm run build
   ```

   This outputs a `dist/` folder.

3. Option A:

   * Serve `dist/` via Nginx / CDN.
   * Talk to backend at `https://your-backend-host`.

4. Option B (MVP demo mode):

   * Copy the contents of `dist/` into the backend repo under `public/`.
   * Start the backend server.
   * Now one server (the backend) serves both the API and the UI.

---

## Reuse for Mobile App

All backend data access is encapsulated as small hooks in `/src/hooks/`:

* `useAttendance`, `usePerformance`, `useTodaySession`, `useRecap`, `useWeeklyReview`, `useParentOverview`

When we build the React Native / Expo app, we can reuse:

* `AuthContext` logic
* these hooks
* the request helper `apiFetch`

This is why the separation (UI components vs data hooks) matters: we keep business logic consistent across Web and Mobile.

---

## Roadmap / Next steps

* Clean up styling to be 100% mobile-first (bigger tap areas, less table-like layout)
* Add direct "Mark player injured / rest recommended" action flow from coach UI
* Add export/share for Weekly Review (PDF or WhatsApp summary to parents / academy staff)
* Eventually deploy Web separately from API (two containers)
* Reuse hooks in an Expo mobile app

---
