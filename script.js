function getTabFromHash() {
    const requested = window.location.hash.replace('#', '');
    return validTabIds.includes(requested) ? requested : defaultTab;
}

function switchToTab(tabId, updateHash = true) {
    buttons.forEach(btn => {
        const isActive = btn.getAttribute('data-tab') === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.tabIndex = isActive ? 0 : -1;
    });
    contents.forEach(content => { content.classList.remove('active'); content.hidden = true; });

    const activeContent = document.getElementById(tabId);
    if (activeContent) { activeContent.classList.add('active'); activeContent.hidden = false; }

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
let savedMode = null;
try { savedMode = localStorage.getItem('darkMode'); } catch (_) { /* Storage may be unavailable in private browsing. */ }

if (savedMode === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.textContent = 'Light Mode';
}

darkModeToggle.setAttribute('aria-pressed', savedMode === 'enabled' ? 'true' : 'false');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    try { localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled'); } catch (_) {}
    darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    darkModeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
});

// ========== FOOTER YEAR ==========
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Connect tab controls to panels and support keyboard navigation.
buttons.forEach((button, index) => {
    const id = button.dataset.tab;
    button.id = 'tab-' + id;
    button.setAttribute('aria-controls', id);
    document.getElementById(id).setAttribute('aria-labelledby', button.id);
    button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next !== undefined) { event.preventDefault(); switchToTab(buttons[next].dataset.tab); buttons[next].focus(); }
    });
});
