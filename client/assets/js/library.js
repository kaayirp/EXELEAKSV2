(async function () {
  const [scripts, categories] = await Promise.all([getScripts(), getCategories()]);
  let activeCat = 'all';
  let query = '';

  // build category chips
  const catBar = document.getElementById('category-filters');
  categories.forEach(cat => {
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.dataset.cat = cat;
    chip.textContent = cat.toUpperCase();
    catBar.appendChild(chip);
  });

  function render() {
    const grid = document.getElementById('library-grid');
    const empty = document.getElementById('empty-state');
    const filtered = scripts.filter(s => {
      const matchesCat = activeCat === 'all' || s.category === activeCat;
      const matchesQuery = !query ||
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });

    grid.innerHTML = filtered.map(scriptCard).join('');
    empty.style.display = filtered.length ? 'none' : 'block';
  }

  catBar.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    catBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCat = chip.dataset.cat;
    render();
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  // changelog: most recently updated scripts
  const changelog = [...scripts].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 6);
  document.getElementById('changelog-list').innerHTML = changelog.map(s => `
    <div class="readout-line">
      <span>${s.updated} — <b style="color:var(--text-hi)">${s.title}</b></span>
      <span style="color:var(--text-low)">${s.slug}</span>
    </div>
  `).join('');

  // deep link ?slug= scrolls to and highlights a card (simple UX touch)
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (slug) query = '';

  render();
})();
