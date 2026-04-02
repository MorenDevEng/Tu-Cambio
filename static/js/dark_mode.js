const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('span');

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        icon.textContent = 'dark_mode';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        icon.textContent = 'light_mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Verificar preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.classList.remove('dark', 'light');
    html.classList.add(savedTheme);
    icon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';
}