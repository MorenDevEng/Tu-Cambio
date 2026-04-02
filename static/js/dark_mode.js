const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const dark_mode = document.getElementById('dark_mode');
const light_mode = document.getElementById('light_mode');

function updateThemeIcons() {
    if (html.classList.contains('light')) {
        dark_mode.classList.add('hidden');
        light_mode.classList.remove('hidden');
    } else {
        dark_mode.classList.remove('hidden');
        light_mode.classList.add('hidden');
    }
}

themeToggle.addEventListener('click', () => {

    updateThemeIcons();

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark'); 
    }

});
