let darkTheme = localStorage.getItem('darkTheme');
const darkModeToggle = document.querySelector('#darkModeToggle');
const iconTheme = document.getElementById('iconTheme');

// Icons
const websitesIcon = document.getElementById('website');
const ui_uxIcon = document.getElementById('ui_ux');
const localization = document.getElementById('localization');
const events = document.getElementById('events');

// Determine the relative path based on the current location
const currentPath = window.location.pathname;

const darkModeEnabled = () => {
    // Replace the source by the image for the dark theme
    let moonIconPath = '';
    switch (true) {
        case (currentPath.match('pages/projects') != null):
            moonIconPath = '../../images/icons/moonIcon.png';
            break;  
        case (currentPath.match('pages') != null):
            moonIconPath = '../images/icons/moonIcon.png';
            break;
        default:
            moonIconPath = './images/icons/moonIcon.png';
            break;
    }
    // iconTheme.src = currentPath.includes('pages') ? '../images/icons/moonIcon.png' : './images/icons/moonIcon.png';
    if (currentPath.match('pages/aboutMe') != null)
    {
        websitesIcon.src = currentPath.includes('pages') ? '../images/icons/aboutMe/Websites_light.png' : './images/icons/aboutMe/Websites_light.png';
        ui_uxIcon.src = currentPath.includes('pages') ? '../images/icons/aboutMe/UI_UX_light.png' : './images/icons/aboutMe/UI_UX_light.png';
        localization.src = currentPath.includes('pages') ? '../images/icons/aboutMe/Localization_light.png' : './images/icons/aboutMe/Localization_light.png';
        events.src = currentPath.includes('pages') ? '../images/icons/aboutMe/Events_light.png' : './images/icons/aboutMe/Events_light.png';
    }

    iconTheme.src = moonIconPath;
    iconTheme.alt = "Moon";
    // Add dark mode class to the body
    document.documentElement.classList.add('darkTheme');
    // Udpate dark mode class in the localStorage
    localStorage.setItem('darkTheme', 'enabled');
};

const darkModeDisabled = () => {
    // Replace the source by the image for the light theme
    let sunIconPath = '';
    switch (true) {
        case (currentPath.match('pages/projects') != null):
            sunIconPath = '../../images/icons/sun.svg';
            break;    
        case (currentPath.match('pages') != null):
            sunIconPath = '../images/icons/sun.svg';
            break;
        default:
            sunIconPath = './images/icons/sun.svg';
            break;
    }

    // iconTheme.src = currentPath.includes('pages') ? '../images/icons/sun.svg' : './images/icons/sun.svg';
    if (currentPath.match('pages/aboutMe') != null) {
        websitesIcon.src = currentPath.includes('pages') ? '../images/icons/aboutMe/Websites_dark.png' : './images/icons/aboutMe/Websites_dark.png';
        ui_uxIcon.src = currentPath.includes('pages') ? '../images/icons/aboutMe/UI_UX_dark.png' : './images/icons/aboutMe/UI_UX_dark.png';
        localization.src = currentPath.includes('pages') ? '../images/icons/aboutMe/Localization_dark.png' : './images/icons/aboutMe/Localization_dark.png';
        events.src = currentPath.includes('pages') ? '../images/icons/aboutMe/Events_dark.png' : './images/icons/aboutMe/Events_dark.png';
    }

    iconTheme.src = sunIconPath;
    iconTheme.alt = "Sun";
    // Remove dark mode class to the body
    document.documentElement.classList.remove('darkTheme');
    // Udpate dark mode class in the localStorage
    localStorage.setItem('darkTheme', 'disabled');
};

window.addEventListener('load', function() {
    // If user had "dark mode" enabled, will keep it after page reloaded
    if (darkTheme === 'enabled') {
        darkModeEnabled();
    }
});

darkModeToggle.addEventListener('click', () => {
    darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme !== "enabled") {
        darkModeEnabled();
    }
    else {
        darkModeDisabled();
    }
});