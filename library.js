/* ==========================================================================
   SoulEXE — Design Tokens
   Palette: near-black ops console + single violet HUD accent
   Type: Rajdhani (display, condensed/technical) + Inter (body) + JetBrains Mono (data)
   Signature: HUD corner-brackets + terminal scanline, borrowed from in-game
   radar/dashboard chrome rather than generic "AI gradient" panels.
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg-void:      #0a0a10;
  --bg-panel:     #121219;
  --bg-panel-2:   #181822;
  --line:         #26262f;
  --violet:       #7c3aed;
  --violet-bright:#a78bfa;
  --violet-dim:   #4c2f8a;
  --text-hi:      #f1f0f5;
  --text-mid:     #a9a7b8;
  --text-low:     #6b6878;
  --green:        #34d399;
  --amber:        #f2b84b;
  --red:          #e6584f;

  --font-display: 'Rajdhani', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius: 3px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg-void);
  color: var(--text-hi);
  font-family: var(--font-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ambient scanline + grid, very low opacity — atmosphere not decoration */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.015) 0px,
    rgba(255,255,255,0.015) 1px,
    transparent 1px,
    transparent 3px
  );
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%);
}

a { color: inherit; text-decoration: none; }
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.01em;
}
code, .mono { font-family: var(--font-mono); }

.wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; position: relative; z-index: 1; }

/* ---------- Nav ---------- */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(10,10,16,0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.nav .wrap { display: flex; align-items: center; justify-content: space-between; height: 68px; }
.brand { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; }
.brand .dot { width: 9px; height: 9px; background: var(--violet-bright); border-radius: 50%; box-shadow: 0 0 12px 2px var(--violet-bright); }
.brand span { color: var(--violet-bright); }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-links a { font-size: 0.92rem; color: var(--text-mid); font-weight: 500; transition: color .15s; }
.nav-links a:hover, .nav-links a.active { color: var(--text-hi); }
.nav-cta {
  border: 1px solid var(--violet); color: var(--violet-bright);
  padding: 8px 16px; border-radius: var(--radius); font-size: 0.85rem; font-weight: 600;
  font-family: var(--font-mono);
  transition: all .15s;
}
.nav-cta:hover { background: var(--violet); color: #fff; box-shadow: 0 0 20px -4px var(--violet); }

/* ---------- HUD corner-bracket frame (signature element) ---------- */
.hud-frame { position: relative; padding: 40px; }
.hud-frame::before, .hud-frame::after,
.hud-frame .c2, .hud-frame .c3 {
  content: ''; position: absolute; width: 22px; height: 22px;
  border-color: var(--violet-bright); border-style: solid; opacity: 0.8;
}
.hud-frame::before { top: 0; left: 0; border-width: 2px 0 0 2px; }
.hud-frame::after  { top: 0; right: 0; border-width: 2px 2px 0 0; }
.hud-frame .c2 { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.hud-frame .c3 { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

/* ---------- Hero ---------- */
.hero { padding: 90px 0 70px; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: center; }
.eyebrow {
  font-family: var(--font-mono); font-size: 0.78rem; color: var(--violet-bright);
  letter-spacing: 0.12em; text-transform: uppercase; display: flex; align-items: center; gap: 10px;
}
.eyebrow::before { content: ''; width: 26px; height: 1px; background: var(--violet-bright); }
.hero h1 { font-size: 3.4rem; line-height: 1.05; margin-top: 18px; }
.hero h1 em { font-style: normal; color: var(--violet-bright); }
.hero p.lead { color: var(--text-mid); font-size: 1.08rem; max-width: 46ch; margin-top: 18px; }
.hero-actions { display: flex; gap: 14px; margin-top: 30px; }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem;
  cursor: pointer; border: none; transition: all .15s;
}
.btn-primary { background: var(--violet); color: #fff; box-shadow: 0 0 0 1px var(--violet-dim); }
.btn-primary:hover { background: var(--violet-bright); box-shadow: 0 0 24px -2px var(--violet-bright); }
.btn-ghost { background: transparent; color: var(--text-hi); border: 1px solid var(--line); }
.btn-ghost:hover { border-color: var(--text-mid); }

/* HUD readout panel in hero */
.readout {
  background: var(--bg-panel); border: 1px solid var(--line); border-radius: var(--radius);
  font-family: var(--font-mono); font-size: 0.82rem; overflow: hidden;
}
.readout-head {
  display: flex; justify-content: space-between; padding: 10px 16px;
  border-bottom: 1px solid var(--line); color: var(--text-low); font-size: 0.72rem; letter-spacing: 0.08em;
}
.readout-head .live { color: var(--green); }
.readout-body { padding: 16px; color: var(--text-mid); }
.readout-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed var(--line); }
.readout-line:last-child { border-bottom: none; }
.readout-line b { color: var(--text-hi); font-weight: 500; }

/* ---------- Stats strip ---------- */
.stats { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 26px 0; }
.stats .wrap { display: flex; justify-content: space-between; }
.stat { text-align: left; }
.stat .num { font-family: var(--font-display); font-size: 1.9rem; font-weight: 700; color: var(--violet-bright); }
.stat .label { font-size: 0.78rem; color: var(--text-low); text-transform: uppercase; letter-spacing: 0.08em; }

/* ---------- Section headers ---------- */
.section { padding: 70px 0; }
.section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 34px; }
.section-head h2 { font-size: 2rem; }
.section-head .tag { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-low); }

/* ---------- Script cards ---------- */
.grid-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.card {
  background: var(--bg-panel); border: 1px solid var(--line); border-radius: var(--radius);
  overflow: hidden; transition: border-color .15s, transform .15s;
  display: flex; flex-direction: column;
}
.card:hover { border-color: var(--violet-dim); transform: translateY(-2px); }
.card-media { aspect-ratio: 16/9; background: var(--bg-panel-2); position: relative; overflow: hidden; }
.card-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.badge {
  position: absolute; top: 10px; left: 10px; font-family: var(--font-mono); font-size: 0.68rem;
  padding: 3px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.05em;
}
.badge-new { background: var(--violet); color: #fff; }
.badge-featured { background: var(--amber); color: #1a1200; }
.card-body { padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.card-body h3 { font-size: 1.15rem; }
.card-body p { color: var(--text-mid); font-size: 0.88rem; margin: 0; flex: 1; }
.card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: var(--text-low); font-family: var(--font-mono); margin-top: 4px; }
.card-meta .dl { color: var(--green); }
.card-cats { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { font-size: 0.7rem; padding: 2px 8px; border: 1px solid var(--line); border-radius: 12px; color: var(--text-mid); }

/* ---------- Search / filters ---------- */
.toolbar { display: flex; gap: 14px; margin-bottom: 30px; flex-wrap: wrap; align-items: center; }
.search-box {
  flex: 1; min-width: 240px; display: flex; align-items: center; gap: 10px;
  background: var(--bg-panel); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 11px 14px;
}
.search-box input {
  background: none; border: none; outline: none; color: var(--text-hi); font-family: var(--font-mono);
  font-size: 0.9rem; width: 100%;
}
.search-box svg { flex-shrink: 0; color: var(--text-low); }
.filter-chip {
  padding: 9px 16px; border: 1px solid var(--line); border-radius: var(--radius);
  font-size: 0.85rem; color: var(--text-mid); cursor: pointer; background: var(--bg-panel);
  font-family: var(--font-mono); transition: all .15s;
}
.filter-chip.active, .filter-chip:hover { border-color: var(--violet); color: var(--violet-bright); }

/* ---------- Footer ---------- */
.footer { border-top: 1px solid var(--line); padding: 40px 0; margin-top: 60px; }
.footer .wrap { display: flex; justify-content: space-between; align-items: center; color: var(--text-low); font-size: 0.85rem; }
.footer a:hover { color: var(--violet-bright); }

/* ---------- Forms (admin/docs) ---------- */
.panel { background: var(--bg-panel); border: 1px solid var(--line); border-radius: var(--radius); padding: 24px; }
label { display: block; font-size: 0.8rem; color: var(--text-mid); margin-bottom: 6px; font-family: var(--font-mono); }
input, textarea, select {
  width: 100%; background: var(--bg-panel-2); border: 1px solid var(--line); color: var(--text-hi);
  padding: 10px 12px; border-radius: var(--radius); font-family: var(--font-body); font-size: 0.92rem;
  margin-bottom: 16px; outline: none; transition: border-color .15s;
}
input:focus, textarea:focus, select:focus { border-color: var(--violet); }
textarea { resize: vertical; min-height: 90px; }

table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
th { text-align: left; color: var(--text-low); font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 10px 12px; border-bottom: 1px solid var(--line); }
td { padding: 12px; border-bottom: 1px solid var(--line); color: var(--text-mid); }
tr:hover td { background: var(--bg-panel-2); }
.icon-btn { background: none; border: 1px solid var(--line); color: var(--text-mid); padding: 6px 10px; border-radius: var(--radius); cursor: pointer; font-size: 0.78rem; margin-right: 6px; }
.icon-btn:hover { border-color: var(--violet); color: var(--violet-bright); }
.icon-btn.danger:hover { border-color: var(--red); color: var(--red); }

/* ---------- Docs page ---------- */
.docs-layout { display: grid; grid-template-columns: 220px 1fr; gap: 40px; }
.docs-nav { position: sticky; top: 90px; align-self: start; display: flex; flex-direction: column; gap: 4px; }
.docs-nav a { padding: 8px 12px; border-radius: var(--radius); font-size: 0.88rem; color: var(--text-mid); }
.docs-nav a:hover, .docs-nav a.active { background: var(--bg-panel); color: var(--violet-bright); }
.docs-content h2 { margin-top: 46px; font-size: 1.6rem; border-bottom: 1px solid var(--line); padding-bottom: 12px; }
.docs-content h2:first-child { margin-top: 0; }
.docs-content p, .docs-content li { color: var(--text-mid); font-size: 0.96rem; }
.docs-content pre {
  background: var(--bg-panel); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 16px; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: var(--violet-bright);
}

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
  .grid-cards { grid-template-columns: repeat(2, 1fr); }
  .docs-layout { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 560px) {
  .grid-cards { grid-template-columns: 1fr; }
  .hero h1 { font-size: 2.3rem; }
  .stats .wrap { flex-wrap: wrap; gap: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { transition: none !important; }
}
