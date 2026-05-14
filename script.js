// ========== TAB PERSISTENCE ==========
const savedTab = localStorage.getItem('activeTab') || 'about';

const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

function switchToTab(tabId) {
    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    const activeButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (activeButton) activeButton.classList.add('active');
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

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙 Dark Mode';
    }
});
