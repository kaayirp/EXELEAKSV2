require('dotenv').config();
const bcrypt = require('bcryptjs');
const store = require('./index');

const DEMO_SCRIPTS = [
  { slug: 'se-garage', title: 'SE Garage', category: 'Garage', description: 'Multi-house vehicle garages with impound, sharing, and livery memory.', framework: 'ESX / QBCore', featured: true, isNew: false },
  { slug: 'se-hud', title: 'SE HUD', category: 'HUD', description: 'Lightweight, configurable HUD — health, armor, hunger, thirst, voice range.', framework: 'Standalone', featured: true, isNew: true },
  { slug: 'se-inventory', title: 'SE Inventory', category: 'Inventory', description: 'Drag-and-drop grid inventory with weight limits and item stacking.', framework: 'QBCore', featured: true, isNew: false },
  { slug: 'se-dispatch', title: 'SE Dispatch', category: 'Police', description: 'Dynamic 911 dispatch alerts with map blips and unit assignment.', framework: 'ESX / QBCore', featured: false, isNew: true },
  { slug: 'se-phone', title: 'SE Phone', category: 'Utility', description: 'In-game smartphone — messages, calls, marketplace, and camera app.', framework: 'Standalone', featured: true, isNew: false },
];

(async function seed() {
  await store.init();

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const hash = await bcrypt.hash(password, 10);
  const admin = await store.createAdmin(username, hash);
  console.log(admin ? `Created admin user "${username}"` : `Admin "${username}" already exists`);

  for (const s of DEMO_SCRIPTS) {
    const existing = await store.getScriptBySlug(s.slug);
    if (existing) continue;
    await store.createScript(s);
    console.log(`Seeded script: ${s.title}`);
  }

  console.log('Seed complete.');
  process.exit(0);
})().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
