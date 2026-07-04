require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('[soulexe] Missing JWT_SECRET in your environment. Set it in .env (see .env.example) before starting the server.');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const store = require('./db');
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploaded files (script zips, thumbnails, preview videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

// Static frontend (client/) — lets Railway serve both from one service
const clientDir = path.join(__dirname, '..', 'client');
app.use(express.static(clientDir));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
  res.sendFile(path.join(clientDir, 'index.html'), err => err && next());
});

// Error handler (multer errors, etc.)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

store.init()
  .then(() => {
    app.listen(PORT, () => console.log(`[soulexe] Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('[soulexe] Failed to initialize database:', err);
    process.exit(1);
  });
