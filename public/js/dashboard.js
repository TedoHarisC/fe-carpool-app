// Helper: decode JWT
function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// Helper: fetch HTML partial
async function fetchComponent(path) {
  const res = await fetch(path);
  return await res.text();
}

// Render dashboard layout & components
async function renderDashboard() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }
  const user = parseJwt(token);

  // Render layout
  const layoutHtml = await fetchComponent('/layouts/DashboardLayout.html');
  document.body.innerHTML = layoutHtml;

  // Render sidebar
  const sidebarHtml = await fetchComponent('/components/Sidebar.html');
  document.getElementById('sidebar').outerHTML = sidebarHtml;

  // Render header
  const headerHtml = await fetchComponent('/components/Header.html');
  document.getElementById('header').outerHTML = headerHtml;

  // Render footer
  const footerHtml = await fetchComponent('/components/Footer.html');
  document.getElementById('footer').outerHTML = footerHtml;

  // Render user info in header dropdown
  document.getElementById('dropdownUserName').textContent = user.username || user.sub || '';
  document.getElementById('dropdownUserEmail').textContent = user.email || '';
  // Optionally set avatar if available
  if (user.avatarUrl) {
    document.getElementById('userAvatar').src = user.avatarUrl;
  }

  // Dropdown toggle
  const userMenuButton = document.getElementById('userMenuButton');
  const userDropdown = document.getElementById('userDropdown');
  userMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('hidden');
  });
  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add('hidden');
    }
  });
  // Sign out
  document.getElementById('signOutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login.html';
  });

  // Render main content (example)
  document.getElementById('main-content').innerHTML = `
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Welcome, ${user.username || user.sub || ''}!</h2>
    <p class="text-gray-700">This is your dashboard.</p>
  `;
}

renderDashboard(); 