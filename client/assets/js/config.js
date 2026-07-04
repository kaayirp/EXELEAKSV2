// Point this at your deployed backend. Same-origin by default (Railway serves
// client + API from one service). Override for local dev against a separate port.
const SOULEXE_API_BASE = window.location.hostname === 'localhost' && window.location.port !== '3000'
  ? 'http://localhost:3000/api'
  : '/api';
