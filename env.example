const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_TTL = '12h';

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const admin = await store.findAdminByUsername(username);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: TOKEN_TTL });
  res.json({ token });
}

module.exports = { login };
