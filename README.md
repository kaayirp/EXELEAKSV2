# SoulEXE

Free FiveM server resources, built and maintained by the crew, distributed
through a small public site with an admin dashboard for managing uploads.

```
SoulEXE/
├── client/                # Static frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── scripts.html
│   ├── docs.html
│   ├── admin/              # Admin login + dashboard
│   └── assets/
├── server/                 # Backend (Express)
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db/                 # Postgres schema + in-memory dev fallback
│   └── uploads/             # Script zips, thumbnails, preview videos
├── railway.json
└── .gitignore
```

## Features

- Public site — script library, live search, category filters, changelog, mobile-responsive
- Admin dashboard — login, upload/edit/delete scripts, category management, download analytics
- REST API backed by PostgreSQL (falls back to an in-memory store with zero setup for local dev)
- File uploads for script archives, thumbnails, and preview videos

## Running locally

```bash
cd server
cp .env.example .env      # then edit .env — at minimum set JWT_SECRET
npm install
npm run seed               # creates the admin login + a few demo scripts
npm start
```

The server serves both the API (`/api/...`) and the static frontend on the
same port, so open **http://localhost:3000** for the site and
**http://localhost:3000/admin/login.html** for the dashboard.

Without a `DATABASE_URL` set, the app uses a temporary in-memory store —
great for trying things out, but data resets every time the server restarts.
Set `DATABASE_URL` (see below) to persist real data.

## Using PostgreSQL

Set `DATABASE_URL` in `.env` to a Postgres connection string. The schema in
`server/db/schema.sql` is applied automatically on boot — no manual
migration step needed. Once it's set, `npm run seed` will create the admin
account and demo data inside that real database instead of memory.

## Deploying — GitHub + Railway

```
Your Computer
      ↓
  GitHub Repository
      ↓
 Railway (auto-deploys from GitHub)
      ↓
   your-app.up.railway.app (or a custom domain)
```

1. Push this repo to GitHub.
2. In Railway, create a new project **from your GitHub repo**.
3. Add a **Postgres** plugin to the project — Railway will inject
   `DATABASE_URL` automatically.
4. In the service's Variables tab, add `JWT_SECRET` (and optionally
   `ADMIN_USERNAME` / `ADMIN_PASSWORD` for the seed script).
5. Deploy. Railway picks up `railway.json`, which installs dependencies in
   `server/` and runs `npm start`.
6. Once it's live, run the seed step once (Railway's one-off command / shell,
   or temporarily set the start command to `npm run seed && npm start`) to
   create your admin login.

From then on:

```bash
git add .
git commit -m "Added new script"
git push
```

Railway rebuilds and redeploys automatically — no manual uploads needed.

## Notes

- Admin auth uses JWT with `bcryptjs`-hashed passwords; tokens are stored in
  `sessionStorage` on the dashboard, not `localStorage`.
- Uploaded files are stored on local disk under `server/uploads/`. Railway's
  filesystem is ephemeral on redeploy — for production durability, point the
  upload paths at an object store (S3-compatible) instead once you outgrow
  local disk.
- Change the default admin password immediately after your first deploy.
