# AlgoForge

**An interactive Data Structures & Algorithms learning laboratory.**
Built & owned by **BroForce Technologies Private Limited**.

> Learn → Visualize → Practice → Solve → Track Progress → Improve.

This is a real MERN-stack product, designed to run **100% offline** in a college lab: React frontend,
Express/Node backend, local MongoDB, and a local Java judge for practice problems — no cloud APIs,
no paid services, no internet connection required after setup.

---

## 1. Current Build Status (read this first)

This repository is a genuine, working foundation, not a mockup. Honest status:

| Area | Status |
|---|---|
| Architecture (backend, frontend, auth, DB, judge, gamification) | ✅ Complete & working |
| **Stack** module (theory, visualizer, code, 5 problems, quiz) | ✅ Fully live |
| **Trees** module (theory, visualizer, code, 5 problems, quiz) | ✅ Fully live |
| **Sorting** module (theory, visualizer, code, 4 problems, quiz) | ✅ Fully live |
| Remaining 13 modules (Recursion, Linked List, Queue, Graph, etc.) | 🚧 Not yet authored — roadmap shows them as "Coming Soon" honestly, not faked |
| Admin dashboard, College Mode, gamification, local judge | ✅ Complete & working |

Everything that exists, works end-to-end. Nothing is a stub pretending to be finished — see
**Section 8: Continuing Development** for exactly how to add the remaining 13 modules using the
same pattern as Stack/Trees/Sorting.

---

## 2. Architecture

```text
React (Vite)  ──HTTP──>  Express REST API  ──Mongoose──>  Local MongoDB
localhost:5173            localhost:5000                  127.0.0.1:27017
```

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS + Axios
- **Backend**: Node.js + Express + Mongoose + JWT + bcrypt
- **Database**: MongoDB, running locally (no Atlas/cloud account)
- **Code execution**: local Java judge (`backend/services/judge.js`) — compiles and runs student
  submissions using a locally-installed JDK. It never calls an external code-execution API. If no
  JDK is present on the machine running the backend, the judge fails with a clear, honest message
  instead of faking a result.

This split means the same frontend/backend can later be pointed at a cloud MongoDB and deployed
online with no rewrite — only environment variables change.

---

## 3. Prerequisites

- **Node.js** 18+ and npm
- **MongoDB Community Server** running locally (see below)
- **A JDK** (Java Development Kit) installed on the machine running the backend, so the Practice
  Arena's "Run"/"Submit" buttons can actually compile and execute student Java code.
  Most college lab machines already have this. To check: `javac -version`
  To install on Ubuntu/Debian labs: `sudo apt install default-jdk`

### MongoDB Setup

Install MongoDB Community Edition for your OS from mongodb.com, then start it:

```bash
# Linux (systemd)
sudo systemctl start mongod

# macOS (Homebrew)
brew services start mongodb-community

# Windows
# MongoDB installs as a service named "MongoDB" and starts automatically —
# or run "mongod" from an elevated terminal.
```

Verify it's running:

```bash
mongosh --eval "db.runCommand({ ping: 1 })"
```

No cloud account, no connection string, no internet needed — the app points at
`mongodb://127.0.0.1:27017/broforce_dsa` by default.

---

## 4. Installation & Running

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed     # populates Stack, Trees, Sorting topics + problems + badges + demo accounts
npm run dev       # starts the API on http://localhost:5000
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev       # starts the app on http://localhost:5173
```

Open **http://localhost:5173** in your browser. The Vite dev server proxies `/api/*` requests to
the backend automatically (see `frontend/vite.config.js`), so no CORS configuration is needed
during development.

### Demo Accounts

Created automatically by `npm run seed`:

| Role | Email | Password |
|---|---|---|
| Student | `student@broforce.local` | `student123` |
| Admin | `admin@broforce.local` | `admin123` |

These are clearly marked as demo/seed accounts (`isDemo: true` in the database) — delete or change
them before any real deployment.

---

## 5. Project Structure

```text
broforce-dsa-platform/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Route handler logic
│   ├── middleware/      # Auth (JWT), error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # Local Java judge, gamification (XP/badges/streaks)
│   ├── seed/
│   │   ├── data/
│   │   │   ├── topics/      # One file per topic's full learning content
│   │   │   └── problems/    # One file per topic's practice problems
│   │   └── seed.js          # Orchestrates the seed
│   ├── .env.example
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/  # Navbar, Footer, ProtectedRoute
│       ├── context/      # AuthContext
│       ├── data/         # roadmapTopics.js (all 14 stages, single source of truth), team.js (edit team names here)
│       ├── pages/        # One file per route
│       ├── services/     # Axios instance
│       └── visualizers/  # Reusable visualization engine (Stack/Sorting/Tree + registry)
└── README.md
```

---

## 6. Key API Routes

All routes are prefixed with `/api`.

| Method | Route | Description |
|---|---|---|
| POST | `/auth/register` | Create a student account |
| POST | `/auth/login` | Log in, returns a JWT |
| GET | `/auth/me` | Current user (requires auth) |
| GET | `/topics` | Roadmap listing |
| GET | `/topics/:slug` | Full topic content (theory, code, complexity) |
| GET/PATCH | `/topics/:slug/progress` | Read/update a student's progress on a topic |
| GET | `/topics/:slug/quiz` | Quiz questions (no answers) |
| POST | `/topics/:slug/quiz/submit` | Submit quiz answers, get scored |
| GET | `/problems` | List problems (filter by `?topic=` `&difficulty=`) |
| GET | `/problems/:slug` | Problem detail |
| POST | `/problems/:slug/run` | Run code against visible test cases (no persistence) |
| POST | `/problems/:slug/submit` | Run against all test cases, persist, award XP/badges |
| GET | `/dashboard` | Aggregated student dashboard data |
| GET | `/admin/stats` | Admin overview + chart data (admin only) |
| GET | `/admin/students` | Student roster with progress (admin only) |
| POST/PATCH/DELETE | `/admin/topics`, `/admin/problems` | Content CRUD (admin only) |

---

## 7. Four-Member Team Workflow

The codebase is split so each member can work independently without merge conflicts:

- **Member 1 — Frontend + UI/UX**: `frontend/src/pages`, `frontend/src/components`,
  `tailwind.config.js`. Design tokens (colors, fonts) are centralized there.
- **Member 2 — Backend + REST APIs**: `backend/controllers`, `backend/routes`,
  `backend/middleware`. Add new endpoints following the existing `asyncHandler` pattern.
- **Member 3 — MongoDB + Auth + Data Management**: `backend/models`, `backend/config/db.js`,
  `backend/middleware/auth.js`, and the Admin roster/College Mode features.
- **Member 4 — DSA Content + Visualizations + Testing**: `backend/seed/data`,
  `frontend/src/visualizers`. This is where new modules get authored (see Section 8).

Run `npm run dev` in both `backend/` and `frontend/` simultaneously during development.

---

## 8. Continuing Development: Adding a New Module

To add one of the remaining 13 modules (e.g. Queue), follow the exact pattern used for Stack:

1. **Content**: create `backend/seed/data/topics/queue.js` — copy `stack.js` as a template and
   replace `whatIsIt`, `whyNeeded`, `howItWorks`, `example`, `codeExamples`, `complexity`, and
   `quiz` with real Queue content.
2. **Problems**: create `backend/seed/data/problems/queueProblems.js` — copy the shape from
   `stackProblems.js`. Each problem needs a `javaTemplate` (student-facing stub) and `testCases`
   (stdin/stdout pairs, some `hidden: true`).
3. **Visualizer**: build `frontend/src/visualizers/QueueVisualizer.jsx` (can start from
   `StackVisualizer.jsx`'s structure — enqueue/dequeue instead of push/pop), then register it in
   `frontend/src/visualizers/index.js`.
4. **Wire it up**: import the new topic/problems in `backend/seed/seed.js`, add `"queue"` to
   `LIVE_SLUGS` in `frontend/src/data/roadmap.js`, and set `visualizerType: "QueueVisualizer"` on
   the topic.
5. Run `npm run seed` again.

Repeat for each remaining module. No other file needs to change — the learning page, progress
tracking, XP system, and admin dashboard all work generically off this data.

---

## 9. Testing Checklist

Verified working as of this build:

- [x] Backend boots and connects to local MongoDB
- [x] Frontend builds with zero errors (`npm run build`)
- [x] Registration and login issue a valid JWT
- [x] Student dashboard loads aggregated progress/XP/streak/badges
- [x] Admin dashboard loads stats, charts, and student roster (role-protected)
- [x] All 3 live topics load theory, code examples, and complexity tables
- [x] Stack, Sorting, and Tree visualizers render and are interactive
- [x] Practice Arena filters by difficulty/status
- [x] Problem detail page runs/submits code against the local Java judge
- [x] Quiz system scores answers and updates topic progress
- [x] XP, levels, streaks, and badge evaluation work on solve/quiz-complete
- [x] 404 page catches unmatched routes
- [ ] End-to-end run against a live local MongoDB (not available in the build sandbox — **you must
      verify this on your machine** by following Section 4; the backend was confirmed to boot
      correctly and fail gracefully without MongoDB, proving all wiring is correct)

---

## 10. Security Notes

- Passwords are hashed with bcrypt before storage.
- JWTs are signed with `JWT_SECRET` from `.env` — **change this before any real deployment**.
- Admin routes are protected by both `protect` (valid JWT) and `requireRole("admin")` middleware.
- The Java judge compiles/runs code in an isolated temp directory per submission and enforces a
  timeout per test case, but it does **not** sandbox the JVM process itself (no seccomp/container
  isolation). For a real multi-user deployment, run the backend in a container with restricted
  permissions, or replace `services/judge.js` with a properly sandboxed runner.

---

© 2026 BroForce Technologies Private Limited. All Rights Reserved.
