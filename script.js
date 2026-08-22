// ========== TAB PERSISTENCE ==========
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

// Guard against a stale tab id left over in localStorage (e.g. a tab that
// no longer exists) so the page never loads with nothing visible.
const requestedTab = localStorage.getItem('activeTab') || 'about';
const validTabIds = Array.from(buttons).map(btn => btn.getAttribute('data-tab'));
const savedTab = validTabIds.includes(requestedTab) ? requestedTab : 'about';

function switchToTab(tabId) {
    buttons.forEach(btn => {
        const isActive = btn.getAttribute('data-tab') === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    contents.forEach(content => content.classList.remove('active'));

    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');

    localStorage.setItem('activeTab', tabId);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        switchToTab(tabId);
    });
});

switchToTab(savedTab);

// ========== DARK MODE ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const savedMode = localStorage.getItem('darkMode');

if (savedMode === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.textContent = '☀️ Light Mode';
}

darkModeToggle.setAttribute('aria-pressed', savedMode === 'enabled' ? 'true' : 'false');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    darkModeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    darkModeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
});

// ========== FOOTER YEAR ==========
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
