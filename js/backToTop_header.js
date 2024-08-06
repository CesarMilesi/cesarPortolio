let calcScrollValue = () => {
    let darkTheme = localStorage.getItem('darkTheme');

    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calHeight); /*Value in %*/

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    }
    else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", function() {
        document.documentElement.scrollTop = 0;
    });

    /* Change the color manually */
    if (darkTheme === 'enabled') {
        scrollProgress.style.background = `conic-gradient(#242845 ${scrollValue}%, #4F5CAD ${scrollValue}%)`;
    }
    else {
        scrollProgress.style.background = `conic-gradient(#99AAFF ${scrollValue}%, #F0F4FF ${scrollValue}%)`;
    }
}


window.onscroll = () => {
    calcScrollValue();
    // let navbar = document.querySelector('.navBar'); Pour la nav sticky !!!
    // let menu = document.querySelector('.menu');

    // navbar.classList.toggle('sticky', window.scrollY > 100);
    // menu.classList.toggle('sticky', window.scrollY > 100);
}
window.onload = calcScrollValue;