# Pastebin-Lite

A simple Pastebin-like application built as a take-home assignment.

Users can:
- Create text pastes
- Get a shareable URL
- View pastes by ID
- Optionally expire pastes using TTL (time-to-live) or max view count

This project is evaluated primarily via automated tests against the deployed application.

---

## Tech Stack

- Node.js
- Next.js (Pages Router)
- JavaScript
- Prisma ORM
- SQLite (local persistence)

---

## How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
     npm run dev
4. Open the app at:
   http://localhost:3000

## Persistence

  SQLite database is used with Prisma ORM.
  The database persists data across requests and satisfies the persistence requirement for automated testing.

## APIs Implemented

*  GET /api/healthz
   Health check

*  POST /api/pastes
   Create a paste

*  GET /api/pastes/:id
   Fetch a paste (JSON)

*  GET /p/:id
   View paste in browser (HTML)