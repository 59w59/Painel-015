const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
const commandsButton = document.querySelector('.commands-button');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    commandsButton.classList.toggle('active');  // Mostra o botão de login no menu toggle

    // Alterna entre o ícone de menu hamburguer e o "X"
    if (mobileMenu.innerHTML.includes('fa-bars')) {
        mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
});
