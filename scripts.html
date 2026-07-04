(function () {
  const token = sessionStorage.getItem('soulexe_admin_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const authHeaders = { 'Authorization': `Bearer ${token}` };

  async function api(path, options = {}) {
    const res = await fetch(`${SOULEXE_API_BASE}${path}`, {
      ...options,
      headers: { ...authHeaders, ...(options.headers || {}) }
    });
    if (res.status === 401) {
      sessionStorage.removeItem('soulexe_admin_token');
      window.location.href = 'login.html';
      throw new Error('unauthorized');
    }
    if (!res.ok) throw new Error(`request failed: ${res.status}`);
    return res.status === 204 ? null : res.json();
  }

  // ---------- Tab navigation ----------
  document.querySelectorAll('.sidebar a[data-tab]').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.sidebar a[data-tab]').forEach(a => a.classList.remove('active'));
      document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(`tab-${link.dataset.tab}`).classList.add('active');
    });
  });

  document.getElementById('logout-link').addEventListener('click', () => {
    sessionStorage.removeItem('soulexe_admin_token');
    window.location.href = 'login.html';
  });

  let scripts = [];
  let categories = [];

  async function loadAll() {
    try {
      [scripts, categories] = await Promise.all([
        api('/admin/scripts'),
        api('/admin/categories')
      ]);
    } catch (e) {
      // API not reachable / not implemented yet — show empty state rather than crash
      scripts = []; categories = [];
    }
    renderOverview();
    renderScriptsTable();
    renderCategoriesTable();
    renderAnalytics();
  }

  function renderOverview() {
    document.getElementById('kpi-scripts').textContent = scripts.length;
    document.getElementById('kpi-downloads').textContent = scripts.reduce((s, x) => s + (x.downloads || 0), 0).toLocaleString();
    document.getElementById('kpi-featured').textContent = scripts.filter(s => s.featured).length;
    document.getElementById('kpi-categories').textContent = categories.length;

    const recent = [...scripts].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 5);
    document.getElementById('recent-table').innerHTML = recent.map(s => `
      <tr><td>${s.title}</td><td>${s.category}</td><td>${s.updated || '—'}</td><td>${(s.downloads||0).toLocaleString()}</td></tr>
    `).join('') || `<tr><td colspan="4" style="color:var(--text-low);">No scripts yet — upload one from the Scripts tab.</td></tr>`;
  }

  function renderScriptsTable() {
    document.getElementById('scripts-table').innerHTML = scripts.map(s => `
      <tr>
        <td>${s.title}</td>
        <td>${s.category}</td>
        <td>${(s.downloads||0).toLocaleString()}</td>
        <td>${s.featured ? '✓' : '—'}</td>
        <td>${s.isNew ? '✓' : '—'}</td>
        <td>
          <button class="icon-btn" data-edit="${s.id}">Edit</button>
          <button class="icon-btn danger" data-delete="${s.id}">Delete</button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="6" style="color:var(--text-low);">No scripts yet.</td></tr>`;

    document.querySelectorAll('[data-edit]').forEach(btn =>
      btn.addEventListener('click', () => openModal(scripts.find(s => String(s.id) === btn.dataset.edit))));
    document.querySelectorAll('[data-delete]').forEach(btn =>
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this script? This cannot be undone.')) return;
        await api(`/admin/scripts/${btn.dataset.delete}`, { method: 'DELETE' });
        loadAll();
      }));
  }

  function renderCategoriesTable() {
    document.getElementById('categories-table').innerHTML = categories.map(c => `
      <tr>
        <td>${c.name}</td>
        <td>${scripts.filter(s => s.category === c.name).length}</td>
        <td><button class="icon-btn danger" data-del-cat="${c.id}">Delete</button></td>
      </tr>
    `).join('') || `<tr><td colspan="3" style="color:var(--text-low);">No categories yet.</td></tr>`;

    document.querySelectorAll('[data-del-cat]').forEach(btn =>
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this category?')) return;
        await api(`/admin/categories/${btn.dataset.delCat}`, { method: 'DELETE' });
        loadAll();
      }));

    const select = document.getElementById('f-category');
    select.innerHTML = categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  function renderAnalytics() {
    const max = Math.max(1, ...scripts.map(s => s.downloads || 0));
    document.getElementById('analytics-bars').innerHTML = [...scripts]
      .sort((a, b) => (b.downloads||0) - (a.downloads||0))
      .map(s => `
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:var(--text-mid); margin-bottom:4px;">
            <span>${s.title}</span><span class="mono">${(s.downloads||0).toLocaleString()}</span>
          </div>
          <div style="background:var(--bg-panel-2); border-radius:2px; height:8px;">
            <div style="background:var(--violet); width:${((s.downloads||0)/max*100).toFixed(1)}%; height:100%; border-radius:2px;"></div>
          </div>
        </div>
      `).join('');
  }

  // ---------- Modal: create/edit script ----------
  const modal = document.getElementById('script-modal');
  const form = document.getElementById('script-form');

  function openModal(script) {
    document.getElementById('modal-title').textContent = script ? 'Edit script' : 'Upload script';
    document.getElementById('script-id').value = script ? script.id : '';
    document.getElementById('f-title').value = script ? script.title : '';
    document.getElementById('f-slug').value = script ? script.slug : '';
    document.getElementById('f-description').value = script ? script.description : '';
    document.getElementById('f-framework').value = script ? script.framework : '';
    document.getElementById('f-featured').checked = !!(script && script.featured);
    document.getElementById('f-new').checked = !!(script && script.isNew);
    if (script) document.getElementById('f-category').value = script.category;
    modal.classList.add('open');
  }

  document.getElementById('btn-new-script').addEventListener('click', () => openModal(null));
  document.getElementById('btn-cancel-modal').addEventListener('click', () => modal.classList.remove('open'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('script-id').value;
    const fd = new FormData();
    fd.append('title', document.getElementById('f-title').value);
    fd.append('slug', document.getElementById('f-slug').value);
    fd.append('description', document.getElementById('f-description').value);
    fd.append('category', document.getElementById('f-category').value);
    fd.append('framework', document.getElementById('f-framework').value);
    fd.append('featured', document.getElementById('f-featured').checked);
    fd.append('isNew', document.getElementById('f-new').checked);
    const fileInput = document.getElementById('f-file').files[0];
    const thumbInput = document.getElementById('f-thumbnail').files[0];
    const videoInput = document.getElementById('f-video').files[0];
    if (fileInput) fd.append('scriptFile', fileInput);
    if (thumbInput) fd.append('thumbnail', thumbInput);
    if (videoInput) fd.append('previewVideo', videoInput);

    try {
      await api(id ? `/admin/scripts/${id}` : '/admin/scripts', {
        method: id ? 'PUT' : 'POST',
        body: fd
      });
      modal.classList.remove('open');
      form.reset();
      loadAll();
    } catch (err) {
      alert('Save failed — check the console/server logs.');
    }
  });

  // ---------- Categories ----------
  document.getElementById('btn-add-cat').addEventListener('click', async () => {
    const name = document.getElementById('new-cat-input').value.trim();
    if (!name) return;
    await api('/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    document.getElementById('new-cat-input').value = '';
    loadAll();
  });

  loadAll();
})();
