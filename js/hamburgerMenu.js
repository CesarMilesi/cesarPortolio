let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.menu');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');