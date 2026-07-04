/* Shared helpers used by home.js and library.js.
   Tries the live API first; falls back to bundled demo data so the
   frontend still looks right if you're previewing it with no backend running. */

const DEMO_CATEGORIES = ['HUD', 'Jobs', 'Garage', 'Inventory', 'Police', 'Economy', 'Utility'];

const DEMO_SCRIPTS = [
  { slug: 'se-garage', title: 'SE Garage', category: 'Garage', description: 'Multi-house vehicle garages with impound, sharing, and livery memory.', downloads: 4210, framework: 'ESX / QBCore', featured: true, isNew: false, thumbnail: '', updated: '2026-06-28' },
  { slug: 'se-hud', title: 'SE HUD', category: 'HUD', description: 'Lightweight, configurable HUD — health, armor, hunger, thirst, voice range.', downloads: 3870, framework: 'Standalone', featured: true, isNew: true, thumbnail: '', updated: '2026-07-01' },
  { slug: 'se-inventory', title: 'SE Inventory', category: 'Inventory', description: 'Drag-and-drop grid inventory with weight limits and item stacking.', downloads: 5120, framework: 'QBCore', featured: true, isNew: false, thumbnail: '', updated: '2026-06-15' },
  { slug: 'se-dispatch', title: 'SE Dispatch', category: 'Police', description: 'Dynamic 911 dispatch alerts with map blips and unit assignment.', downloads: 2890, framework: 'ESX / QBCore', featured: false, isNew: true, thumbnail: '', updated: '2026-06-30' },
  { slug: 'se-jobs-mechanic', title: 'SE Mechanic Job', category: 'Jobs', description: 'Full mechanic job loop — tow calls, repair minigame, parts shop.', downloads: 1980, framework: 'QBCore', featured: false, isNew: false, thumbnail: '', updated: '2026-05-22' },
  { slug: 'se-banking', title: 'SE Banking', category: 'Economy', description: 'ATM & bank UI with transfers, invoices, and society accounts.', downloads: 3320, framework: 'ESX', featured: false, isNew: false, thumbnail: '', updated: '2026-06-10' },
  { slug: 'se-phone', title: 'SE Phone', category: 'Utility', description: 'In-game smartphone — messages, calls, marketplace, and camera app.', downloads: 4790, framework: 'Standalone', featured: true, isNew: false, thumbnail: '', updated: '2026-06-20' },
  { slug: 'se-housing', title: 'SE Housing', category: 'Utility', description: 'Player-owned housing with furniture placement and door locks.', downloads: 2140, framework: 'QBCore', featured: false, isNew: false, thumbnail: '', updated: '2026-05-30' },
];

async function fetchJSON(path) {
  try {
    const res = await fetch(`${SOULEXE_API_BASE}${path}`);
    if (!res.ok) throw new Error('bad response');
    return await res.json();
  } catch (err) {
    return null; // caller falls back to demo data
  }
}

async function getScripts() {
  const live = await fetchJSON('/scripts');
  return (live && live.length) ? live : DEMO_SCRIPTS;
}

async function getCategories() {
  const live = await fetchJSON('/categories');
  return (live && live.length) ? live : DEMO_CATEGORIES;
}

function initials(title) {
  return title.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

function scriptCard(s) {
  const badge = s.featured ? '<span class="badge badge-featured">Featured</span>'
              : s.isNew ? '<span class="badge badge-new">New</span>' : '';
  const media = s.thumbnail
    ? `<img src="${s.thumbnail}" alt="${s.title}">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);color:var(--violet-dim);font-size:1.8rem;font-weight:600;">${initials(s.title)}</div>`;

  return `
  <div class="card">
    <div class="card-media">${badge}${media}</div>
    <div class="card-body">
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <div class="card-cats"><span class="chip">${s.category}</span><span class="chip">${s.framework}</span></div>
      <div class="card-meta">
        <span class="dl">↓ ${s.downloads.toLocaleString()}</span>
        <a href="scripts.html?slug=${s.slug}" style="color:var(--violet-bright);">View →</a>
      </div>
    </div>
  </div>`;
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}
