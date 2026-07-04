<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Login — SoulEXE</title>
<link rel="stylesheet" href="../assets/css/style.css">
<style>
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .login-box { width: 360px; }
  .login-box .brand { justify-content: center; margin-bottom: 24px; font-size: 1.6rem; }
  .error { color: var(--red); font-size: 0.85rem; margin: -8px 0 14px; display: none; font-family: var(--font-mono); }
</style>
</head>
<body>
  <div class="login-box">
    <div class="brand" style="display:flex;"><span class="dot"></span>Soul<span>EXE</span></div>
    <div class="panel hud-frame">
      <span class="c2"></span><span class="c3"></span>
      <div class="eyebrow" style="margin-bottom:16px;">ADMIN_ACCESS</div>
      <form id="login-form">
        <label for="username">Username</label>
        <input id="username" type="text" autocomplete="username" required>
        <label for="password">Password</label>
        <input id="password" type="password" autocomplete="current-password" required>
        <div class="error" id="error-msg">Invalid credentials.</div>
        <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Sign in</button>
      </form>
    </div>
  </div>

  <script src="../assets/js/config.js"></script>
  <script>
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorMsg = document.getElementById('error-msg');
      try {
        const res = await fetch(`${SOULEXE_API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw new Error('unauthorized');
        const data = await res.json();
        sessionStorage.setItem('soulexe_admin_token', data.token);
        window.location.href = 'dashboard.html';
      } catch (err) {
        errorMsg.style.display = 'block';
      }
    });
  </script>
</body>
</html>
