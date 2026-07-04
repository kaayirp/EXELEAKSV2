const fs = require('fs');
const store = require('../db');

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function listScripts(req, res) {
  const scripts = await store.listScripts();
  res.json(scripts);
}

async function listCategories(req, res) {
  const categories = await store.listCategories();
  res.json(categories);
}

async function createScript(req, res) {
  const body = req.body;
  const files = req.files || {};

  const slug = body.slug ? slugify(body.slug) : slugify(body.title);
  const existing = await store.getScriptBySlug(slug);
  if (existing) return res.status(409).json({ error: 'A script with that slug already exists' });

  const script = await store.createScript({
    slug,
    title: body.title,
    description: body.description,
    category: body.category,
    framework: body.framework || 'Standalone',
    filePath: files.scriptFile ? files.scriptFile[0].path : null,
    thumbnail: files.thumbnail ? files.thumbnail[0].path : null,
    videoPath: files.previewVideo ? files.previewVideo[0].path : null,
    featured: body.featured === 'true' || body.featured === true,
    isNew: body.isNew === 'true' || body.isNew === true,
  });

  res.status(201).json(script);
}

async function updateScript(req, res) {
  const { id } = req.params;
  const body = req.body;
  const files = req.files || {};

  const update = {
    title: body.title,
    description: body.description,
    category: body.category,
    framework: body.framework,
    featured: body.featured === 'true' || body.featured === true,
    isNew: body.isNew === 'true' || body.isNew === true,
  };
  if (files.scriptFile) update.filePath = files.scriptFile[0].path;
  if (files.thumbnail) update.thumbnail = files.thumbnail[0].path;
  if (files.previewVideo) update.videoPath = files.previewVideo[0].path;

  const script = await store.updateScript(id, update);
  if (!script) return res.status(404).json({ error: 'Script not found' });
  res.json(script);
}

async function deleteScript(req, res) {
  const script = await store.getScriptById(req.params.id);
  if (!script) return res.status(404).json({ error: 'Script not found' });

  // best-effort cleanup of uploaded files
  [script.filePath, script.thumbnail, script.videoPath].forEach(p => {
    if (p && fs.existsSync(p)) fs.unlink(p, () => {});
  });

  await store.deleteScript(req.params.id);
  res.status(204).end();
}

async function createCategory(req, res) {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Category name required' });
  const category = await store.createCategory(name.trim());
  if (!category) return res.status(409).json({ error: 'Category already exists' });
  res.status(201).json(category);
}

async function deleteCategory(req, res) {
  await store.deleteCategory(req.params.id);
  res.status(204).end();
}

module.exports = {
  listScripts, listCategories, createScript, updateScript, deleteScript,
  createCategory, deleteCategory
};
