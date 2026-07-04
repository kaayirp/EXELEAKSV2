// Zero-config fallback used when no DATABASE_URL is set. Good for local dev
// or a quick preview deploy; data resets whenever the process restarts.
// Swap to pg-store.js (automatic once DATABASE_URL is present) for real persistence.

let scripts = [];
let categories = [
  { id: 1, name: 'HUD' }, { id: 2, name: 'Jobs' }, { id: 3, name: 'Garage' },
  { id: 4, name: 'Inventory' }, { id: 5, name: 'Police' }, { id: 6, name: 'Economy' }, { id: 7, name: 'Utility' }
];
let admins = [];
let nextScriptId = 1;
let nextCatId = categories.length + 1;

module.exports = {
  async init() { /* nothing to do for memory store */ },

  async listScripts() {
    return [...scripts].sort((a, b) => new Date(b.updated) - new Date(a.updated));
  },
  async getScriptBySlug(slug) {
    return scripts.find(s => s.slug === slug) || null;
  },
  async getScriptById(id) {
    return scripts.find(s => s.id === Number(id)) || null;
  },
  async createScript(data) {
    const script = { id: nextScriptId++, downloads: 0, updated: new Date().toISOString(), ...data };
    scripts.push(script);
    return script;
  },
  async updateScript(id, data) {
    const idx = scripts.findIndex(s => s.id === Number(id));
    if (idx === -1) return null;
    scripts[idx] = { ...scripts[idx], ...data, updated: new Date().toISOString() };
    return scripts[idx];
  },
  async deleteScript(id) {
    scripts = scripts.filter(s => s.id !== Number(id));
  },
  async incrementDownload(id) {
    const script = scripts.find(s => s.id === Number(id));
    if (script) script.downloads += 1;
  },
  async listCategories() {
    return categories;
  },
  async createCategory(name) {
    if (categories.some(c => c.name === name)) return null;
    const cat = { id: nextCatId++, name };
    categories.push(cat);
    return cat;
  },
  async deleteCategory(id) {
    categories = categories.filter(c => c.id !== Number(id));
  },
  async findAdminByUsername(username) {
    return admins.find(a => a.username === username);
  },
  async createAdmin(username, passwordHash) {
    if (admins.some(a => a.username === username)) return null;
    const admin = { id: admins.length + 1, username, password_hash: passwordHash };
    admins.push(admin);
    return admin;
  }
};
