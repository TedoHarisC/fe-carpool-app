const API_BASE_URL = window.APP_CONFIG.API_BASE_URL;
const LOGIN_PATH = "/auth/login";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorDiv = document.getElementById('loginError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.classList.add('hidden');
    const username = form.username.value;
    const password = form.password.value;

    try {
      const res = await fetch(`${API_BASE_URL}${LOGIN_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: username, Password: password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Sukses login, redirect atau simpan token
        window.location.href = '/dashboard.html';
      } else {
        errorDiv.textContent = data.message || 'Login gagal. Cek username/password.';
        errorDiv.classList.remove('hidden');
      }
    } catch (err) {
      errorDiv.textContent = 'Terjadi error koneksi ke server.';
      errorDiv.classList.remove('hidden');
    }
  });
}); 