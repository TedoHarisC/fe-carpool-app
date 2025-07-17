function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }
  const user = parseJwt(token);
  if (user) {
    document.getElementById('userName').textContent = user.username || user.sub || '';

    const role =
    user.role ||
    user.Role ||
    user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    '';
    
    document.getElementById('userRole').textContent = role;
  } else {
    window.location.href = '/login.html';
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login.html';
    });
  }
}); 