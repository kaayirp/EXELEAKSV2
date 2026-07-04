// Automatically uses Postgres when DATABASE_URL is set (Railway sets this for
// you once you attach a Postgres plugin), otherwise falls back to an
// in-memory store so `npm start` works immediately with zero setup.
const store = process.env.DATABASE_URL
  ? require('./pg-store')
  : require('./memory-store');

if (!process.env.DATABASE_URL) {
  console.warn('[soulexe] No DATABASE_URL set — using in-memory store. Data will NOT persist across restarts. Attach Postgres on Railway for production.');
}

module.exports = store;
