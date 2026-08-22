// ========== TAB NAVIGATION (URL hash based) ==========
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const validTabIds = Array.from(buttons).map(btn => btn.getAttribute('data-tab'));
const defaultTab = 'about';

function getTabFromHash() {
    const requested = window.location.hash.replace('#', '');
    return validTabIds.includes(requested) ? requested : defaultTab;
}

function switchToTab(tabId, updateHash = true) {
    buttons.forEach(btn => {
        const isActive = btn.getAttribute('data-tab') === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    contents.forEach(content => content.classList.remove('active'));

    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');

    if (updateHash) {
        const newHash = '#' + tabId;
        if (window.location.hash !== newHash) {
            history.pushState(null, '', newHash);
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        switchToTab(tabId);
    });
});

// Support browser back/forward and manually edited/shared URLs
window.addEventListener('hashchange', () => {
    switchToTab(getTabFromHash(), false);
});

// On a fresh load with no hash, land on About Me (don't restore a
// previous session's tab) - the URL is the single source of truth.
switchToTab(getTabFromHash(), false);

// ========== DARK MODE ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const savedMode = localStorage.getItem('darkMode');

if (savedMode === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.textContent = 'Light Mode';
}

darkModeToggle.setAttribute('aria-pressed', savedMode === 'enabled' ? 'true' : 'false');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    darkModeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
});

// ========== FOOTER YEAR ==========
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
