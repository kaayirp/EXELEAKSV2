(async function () {
  const scripts = await getScripts();

  const featured = scripts.filter(s => s.featured).slice(0, 3);
  const trending = [...scripts].sort((a, b) => b.downloads - a.downloads).slice(0, 3);

  document.getElementById('featured-grid').innerHTML = featured.map(scriptCard).join('');
  document.getElementById('trending-grid').innerHTML = trending.map(scriptCard).join('');

  const totalDownloads = scripts.reduce((sum, s) => sum + s.downloads, 0);
  document.getElementById('stat-scripts').textContent = scripts.length;
  document.getElementById('stat-downloads').textContent = formatCount(totalDownloads);

  const latest = [...scripts].sort((a, b) => new Date(b.updated) - new Date(a.updated))[0];
  if (latest) document.getElementById('feed-latest').textContent = `${latest.slug}-v${(Math.random()*2+1).toFixed(1)}`;
  document.getElementById('feed-count').textContent = scripts.length;
  document.getElementById('feed-downloads').textContent = formatCount(totalDownloads);
})();
