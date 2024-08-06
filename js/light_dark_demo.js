// 1.
let darkThemeDemo = localStorage.getItem('darkItemDemo');
const darkModeToggleDemo = document.getElementById('darkModeToggleDemo');
const iconThemeDemo = document.getElementById('iconThemeDemo');
let primaryDiv = document.getElementById("primaryDivDemo");
let clickText = document.getElementById("demoText");

// 2.
// a.
const darkModeEnabled_Demo = () => {
    iconThemeDemo.src = '../../images/icons/moonIcon.png';

    primaryDiv.style.background = `linear-gradient(#3D467E
    0 0) padding-box,
    linear-gradient(to right, #E0C2FF, #CC85FF) border-box`;
    darkModeToggleDemo.style.backgroundColor = "#C2CEFF";
    clickText.style.color = "#1A1B2C";

    localStorage.setItem('darkItemDemo', 'enabled');
};

// b.
const darkModeDisabled_Demo = () => {
    iconThemeDemo.src = '../../images/icons/sun.svg';

    primaryDiv.style.background = `linear-gradient(#C2CEFF
    0 0) padding-box,
    linear-gradient(to right, #8400BD, #60008A) border-box`;
    darkModeToggleDemo.style.backgroundColor = "#3D467E";
    clickText.style.color = "#F0F4FF";

    localStorage.setItem('darkItemDemo', 'disabled');
};

if (darkThemeDemo === 'enabled') {
    darkModeEnabled_Demo();
}

// 3.
darkModeToggleDemo.addEventListener('click', () => {
    darkThemeDemo = localStorage.getItem("darkItemDemo");
    if (darkThemeDemo !== "enabled") {
        darkModeEnabled_Demo();
    }
    else {
        darkModeDisabled_Demo();
    }
});