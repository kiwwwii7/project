// header-footer-loader.js
fetch('header/standart.html')
.then(response => response.text())
.then(html => {
    document.getElementById('headerAndFooter').innerHTML = html;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'header/standart.css';
    document.head.appendChild(link);
});