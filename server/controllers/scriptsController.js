const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const store = require('../db');

function toPublic(script) {
  return {
    id: script.id,
    slug: script.slug,
    title: script.title,
    description: script.description,
    category: script.category,
    framework: script.framework,
    downloads: script.downloads || 0,
    featured: !!script.featured,
    isNew: !!script.isNew,
    thumbnail: script.thumbnail ? `/uploads/thumbnails/${path.basename(script.thumbnail)}` : '',
    videoPath: script.videoPath ? `/uploads/videos/${path.basename(script.videoPath)}` : '',
    updated: script.updated
  };
}

async function listScripts(req, res) {
  const scripts = await store.listScripts();
  res.json(scripts.map(toPublic));
}

async function getScript(req, res) {
  const script = await store.getScriptBySlug(req.params.slug);
  if (!script) return res.status(404).json({ error: 'Script not found' });
  res.json(toPublic(script));
}

async function listCategories(req, res) {
  const categories = await store.listCategories();
  res.json(categories.map(c => c.name));
}

async function downloadScript(req, res) {
  const script = await store.getScriptBySlug(req.params.slug);
  if (!script) return res.status(404).json({ error: 'Script not found' });
  if (!script.filePath || !fs.existsSync(script.filePath)) {
    return res.status(404).json({ error: 'No file uploaded for this script yet' });
  }

  const ipHash = crypto.createHash('sha256').update(req.ip || 'unknown').digest('hex').slice(0, 16);
  await store.incrementDownload(script.id, ipHash);

  res.download(script.filePath, `${script.slug}.zip`);
}

module.exports = { listScripts, getScript, listCategories, downloadScript };
