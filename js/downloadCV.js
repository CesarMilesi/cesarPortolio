// Select button
let button = document.getElementById('download');
// Determine the relative path based on the current location
const actualPath = window.location.pathname;
const startUrl = actualPath.includes('pages') ? '../' : './'; 
// Get current language
let storedLanguage = localStorage.getItem('selectedLanguage');
let downloadLanguage = (storedLanguage != null) ? storedLanguage : document.querySelector('.selectedLanguage');

// Event on click
button.addEventListener("click", () => {
    switch (selectedLanguage.innerHTML) {
        case 'English' || 'EN':
            button.setAttribute("href", startUrl + "cv/CV - EN version.pdf");
            button.setAttribute("download", "CV Cesar MILESI - English");
            break;
        case 'Français' || 'FR':
            button.setAttribute("href", startUrl + "cv/CV - FR version.pdf");
            button.setAttribute("download", "CV Cesar MILESI - Français");
            break;
        default:
            button.setAttribute("href", startUrl + "cv/CV - JP version.pdf");
            button.setAttribute("download", "Rirekisho Cesar MILESI - Japanese");
            break;
    }
});