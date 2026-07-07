/* ===== CORE ACADEMY — Shared App Logic ===== */

// ── Role definitions ──
const ROLES = {
  student: { key: 'student', label: "O'quvchi", icon: '🎓', dashboard: 'dashboard.html' },
  teacher: { key: 'teacher', label: "O'qituvchi", icon: '👨‍🏫', dashboard: 'teacher.html' },
  admin: { key: 'admin', label: 'Boshliq', icon: '👔', dashboard: 'admin.html' },
  creator: { key: 'creator', label: 'Yaratuvchi', icon: '🛡️', dashboard: 'creator.html' }
};

// ── Get current user ──
function getCurrentUser() {
  const saved = localStorage.getItem('ca_user');
  if (saved) return JSON.parse(saved);
  return null;
}

function setCurrentUser(user) {
  localStorage.setItem('ca_user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('ca_user');
  window.location.href = 'login.html';
}

// ── Check if on a page-level path ──
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '';
  return 'pages/';
}

function isCurrentPage(filename) {
  return window.location.pathname.endsWith(filename);
}

// ── Build Sidebar ──
function buildSidebar(role) {
  const base = getBasePath();
  
  const navItems = {
    student: [
      { section: 'Asosiy' },
      { label: 'Dashboard', icon: '📊', href: `${base}dashboard.html`, page: 'dashboard.html' },
      { label: 'Kurslar', icon: '📚', href: `${base}courses.html`, page: 'courses.html' },
      { label: 'Jonli Dars', icon: '🎥', href: `${base}live-lesson.html`, page: 'live-lesson.html' },
      { label: 'Chat', icon: '💬', href: `${base}chat.html`, page: 'chat.html', badge: '5' },
      { section: 'Shaxsiy' },
      { label: 'Obuna', icon: '💳', href: `${base}payments.html`, page: 'payments.html' },
      { label: 'Profil', icon: '👤', href: `${base}profile.html`, page: 'profile.html' },
    ],
    teacher: [
      { section: 'Asosiy' },
      { label: 'Dashboard', icon: '📊', href: `${base}teacher.html`, page: 'teacher.html' },
      { label: "Darslar", icon: '📚', href: `${base}courses.html`, page: 'courses.html' },
      { label: 'Jonli Dars', icon: '🎥', href: `${base}live-lesson.html`, page: 'live-lesson.html' },
      { label: 'Chat', icon: '💬', href: `${base}chat.html`, page: 'chat.html', badge: '3' },
      { section: 'Boshqaruv' },
      { label: "O'quvchilar", icon: '👥', href: `${base}teacher.html#students`, page: '' },
      { label: 'Vazifalar', icon: '📝', href: `${base}teacher.html#homework`, page: '' },
      { section: 'Shaxsiy' },
      { label: 'Profil', icon: '👤', href: `${base}profile.html`, page: 'profile.html' },
    ],
    admin: [
      { section: 'Asosiy' },
      { label: 'Dashboard', icon: '📊', href: `${base}admin.html`, page: 'admin.html' },
      { label: "O'qituvchilar", icon: '👨‍🏫', href: `${base}admin.html#teachers`, page: '' },
      { label: "O'quvchilar", icon: '👥', href: `${base}admin.html#students`, page: '' },
      { section: 'Platforma' },
      { label: 'Kurslar', icon: '📚', href: `${base}courses.html`, page: 'courses.html' },
      { label: "To'lovlar", icon: '💰', href: `${base}payments.html`, page: 'payments.html' },
      { label: 'Chat', icon: '💬', href: `${base}chat.html`, page: 'chat.html', badge: '2' },
      { section: 'Tizim' },
      { label: 'Hisobotlar', icon: '📈', href: `${base}admin.html#reports`, page: '' },
      { label: "E'lonlar", icon: '📢', href: `${base}admin.html#announcements`, page: '' },
      { label: 'Sozlamalar', icon: '⚙️', href: `${base}profile.html`, page: 'profile.html' },
    ],
    creator: [
      { section: 'Asosiy' },
      { label: 'Dashboard', icon: '🏠', href: `${base}creator.html`, page: 'creator.html' },
      { label: "O'quv Markazlar", icon: '🏢', href: `${base}creator.html#centers`, page: '' },
      { section: 'Boshqaruv' },
      { label: "Barcha O'qituvchilar", icon: '👨‍🏫', href: `${base}creator.html#teachers`, page: '' },
      { label: "Barcha O'quvchilar", icon: '👥', href: `${base}creator.html#students`, page: '' },
      { label: "Barcha To'lovlar", icon: '💰', href: `${base}creator.html#payments`, page: '' },
      { section: 'Platforma' },
      { label: 'Obuna Rejalar', icon: '💳', href: `${base}creator.html#plans`, page: '' },
      { label: 'Kurslar', icon: '📚', href: `${base}courses.html`, page: 'courses.html' },
      { label: 'Chat', icon: '💬', href: `${base}chat.html`, page: 'chat.html' },
      { section: 'Tizim' },
      { label: 'Audit Log', icon: '📋', href: `${base}creator.html#audit`, page: '' },
      { label: 'Tizim Holati', icon: '🖥️', href: `${base}creator.html#health`, page: '' },
      { label: 'Sozlamalar', icon: '⚙️', href: `${base}profile.html`, page: 'profile.html' },
    ]
  };

  const items = navItems[role] || navItems.student;
  const user = getCurrentUser() || { name: 'Demo User', role: 'student' };
  const roleInfo = ROLES[role] || ROLES.student;

  let html = `
    <div class="brand">
      <div class="logo">C</div>
      <div>
        <div class="name">CORE <span>Academy</span></div>
        <div class="sub">Premium EdTech</div>
      </div>
    </div>
    <div class="nav">
  `;

  items.forEach(item => {
    if (item.section) {
      html += `<div class="label">${item.section}</div>`;
    } else {
      const active = isCurrentPage(item.page) ? ' active' : '';
      const badge = item.badge ? `<span class="badge">${item.badge}</span>` : '';
      html += `
        <a href="${item.href}" class="${active}">
          <span class="ico">${item.icon}</span>
          ${item.label}
          ${badge}
        </a>
      `;
    }
  });

  html += `
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-user" onclick="logout()">
        <div class="avatar sm">${user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.name || 'Demo User'}</div>
          <div style="font-size:11px;color:var(--muted)">${roleInfo.icon} ${roleInfo.label}</div>
        </div>
        <span style="color:var(--muted);font-size:14px" title="Chiqish">🚪</span>
      </div>
    </div>
  `;

  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;
}

// ── Build Topbar ──
function buildTopbar() {
  const user = getCurrentUser() || { name: 'Demo User' };
  const html = `
    <button class="mobile-toggle" onclick="toggleSidebar()" id="menuToggle">☰</button>
    <div class="search">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Qidirish..." id="globalSearch"/>
    </div>
    <div class="topbar-right">
      <div class="lang-pick">
        <button class="active" onclick="setLang('uz')">UZ</button>
        <button onclick="setLang('en')">EN</button>
        <button onclick="setLang('ru')">RU</button>
      </div>
      <button class="icon-btn" onclick="showNotifications()" title="Bildirishnomalar">
        🔔<span class="notif-dot"></span>
      </button>
      <div class="avatar" onclick="window.location.href='${getBasePath()}profile.html'" title="Profil">
        ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </div>
    </div>
  `;
  const topbar = document.getElementById('topbar');
  if (topbar) topbar.innerHTML = html;
}

// ── Download FAB ──
function buildFAB() {
  if (document.getElementById('downloadFab')) return;
  const fab = document.createElement('button');
  fab.className = 'fab';
  fab.id = 'downloadFab';
  fab.innerHTML = '<span class="dot"></span> 📥 Ilovani Yuklab Olish';
  fab.onclick = openDownloadModal;
  document.body.appendChild(fab);

  // Create download modal
  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.id = 'downloadModal';
  modal.innerHTML = `
    <div class="modal" style="position:relative">
      <button class="close-modal" onclick="closeDownloadModal()">✕</button>
      <h3>📥 Ilovani Yuklab Olish</h3>
      <p>Core Academy ilovasini qurilmangizga yuklab oling — App Store yoki Google Play kerak emas!</p>
      
      <button class="dl-btn" onclick="downloadApp('windows')">
        <div class="lg">🪟</div>
        <div>
          <div class="ttl">Windows uchun</div>
          <div class="sub">Windows 10/11 · 64-bit · 85 MB</div>
        </div>
        <span class="dl-arrow">↓</span>
      </button>
      
      <button class="dl-btn" onclick="downloadApp('mac')">
        <div class="lg">🍎</div>
        <div>
          <div class="ttl">macOS uchun</div>
          <div class="sub">macOS 12+ · Universal · 92 MB</div>
        </div>
        <span class="dl-arrow">↓</span>
      </button>
      
      <button class="dl-btn" onclick="downloadApp('android')">
        <div class="lg">🤖</div>
        <div>
          <div class="ttl">Android uchun (APK)</div>
          <div class="sub">Android 8.0+ · ARM64 · 45 MB</div>
        </div>
        <span class="dl-arrow">↓</span>
      </button>
      
      <p style="text-align:center;margin-top:16px;font-size:12px;color:var(--muted)">
        Ilova veb-platformaning o'rab olingan versiyasi — barcha funksiyalar mavjud!
      </p>
    </div>
  `;
  document.body.appendChild(modal);
}

function openDownloadModal() {
  document.getElementById('downloadModal').classList.add('open');
}

function closeDownloadModal() {
  document.getElementById('downloadModal').classList.remove('open');
}

function downloadApp(platform) {
  showToast(`${platform.charAt(0).toUpperCase() + platform.slice(1)} ilovasi tez orada tayyor bo'ladi! 🚀`, 'info');
}

// ── Sidebar Toggle (Mobile) ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
    // Create overlay
    let overlay = document.getElementById('sidebarOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidebarOverlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:35;display:none';
      overlay.onclick = () => {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
      };
      document.body.appendChild(overlay);
    }
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
  }
}

// ── Toast Notifications ──
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeIn .3s var(--ease) reverse';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ── Notification Panel ──
function showNotifications() {
  showToast('3 ta yangi bildirishnoma', 'info');
}

// ── Language Switcher ──
function setLang(lang) {
  document.querySelectorAll('.lang-pick button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  localStorage.setItem('ca_lang', lang);
  showToast(`Til o'zgartirildi: ${lang.toUpperCase()}`, 'success');
}

// ── Initialize Dashboard Pages ──
function initDashboardPage(role) {
  const user = getCurrentUser();
  if (!user) {
    // For demo, create a default user
    setCurrentUser({ name: 'Demo User', role: role, email: 'demo@coreacademy.uz' });
  }
  buildSidebar(role || (user && user.role) || 'student');
  buildTopbar();
  buildFAB();
}

// ── Close modals on outside click ──
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-bg')) {
    e.target.classList.remove('open');
  }
});

// ── Close modals on Escape ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-bg.open').forEach(m => m.classList.remove('open'));
  }
});

// ── Animate elements on scroll ──
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
