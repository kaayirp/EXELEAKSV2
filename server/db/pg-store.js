const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function init() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
}

function mapScript(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    framework: row.framework,
    filePath: row.file_path,
    thumbnail: row.thumbnail_path,
    videoPath: row.video_path,
    downloads: row.downloads,
    featured: row.featured,
    isNew: row.is_new,
    updated: row.updated_at
  };
}

module.exports = {
  init,

  async listScripts() {
    const { rows } = await pool.query('SELECT * FROM scripts ORDER BY updated_at DESC');
    return rows.map(mapScript);
  },

  async getScriptBySlug(slug) {
    const { rows } = await pool.query('SELECT * FROM scripts WHERE slug = $1', [slug]);
    return mapScript(rows[0]);
  },

  async getScriptById(id) {
    const { rows } = await pool.query('SELECT * FROM scripts WHERE id = $1', [id]);
    return mapScript(rows[0]);
  },

  async createScript(data) {
    const { rows } = await pool.query(
      `INSERT INTO scripts (slug, title, description, category, framework, file_path, thumbnail_path, video_path, featured, is_new)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [data.slug, data.title, data.description, data.category, data.framework,
       data.filePath, data.thumbnail, data.videoPath, data.featured, data.isNew]
    );
    return mapScript(rows[0]);
  },

  async updateScript(id, data) {
    const existing = await this.getScriptById(id);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const { rows } = await pool.query(
      `UPDATE scripts SET title=$1, description=$2, category=$3, framework=$4,
       file_path=$5, thumbnail_path=$6, video_path=$7, featured=$8, is_new=$9, updated_at=now()
       WHERE id=$10 RETURNING *`,
      [merged.title, merged.description, merged.category, merged.framework,
       merged.filePath ?? merged.file_path, merged.thumbnail ?? merged.thumbnail_path,
       merged.videoPath ?? merged.video_path, merged.featured, merged.isNew, id]
    );
    return mapScript(rows[0]);
  },

  async deleteScript(id) {
    await pool.query('DELETE FROM scripts WHERE id = $1', [id]);
  },

  async incrementDownload(id, ipHash) {
    await pool.query('UPDATE scripts SET downloads = downloads + 1 WHERE id = $1', [id]);
    await pool.query('INSERT INTO downloads_log (script_id, ip_hash) VALUES ($1, $2)', [id, ipHash]);
  },

  async listCategories() {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  },

  async createCategory(name) {
    const { rows } = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *',
      [name]
    );
    return rows[0];
  },

  async deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  },

  async findAdminByUsername(username) {
    const { rows } = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    return rows[0];
  },

  async createAdmin(username, passwordHash) {
    const { rows } = await pool.query(
      'INSERT INTO admins (username, password_hash) VALUES ($1,$2) ON CONFLICT (username) DO NOTHING RETURNING *',
      [username, passwordHash]
    );
    return rows[0];
  }
};
