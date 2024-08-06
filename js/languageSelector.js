let dropdown = document.querySelector('.drop-down');
let list = document.querySelector('.list');
let language = document.querySelectorAll('.language');
let selectedLanguage = document.querySelector('.selectedLanguage');
let selectedFlag = document.querySelector('.selectedFlag');

let currentLanguage = localStorage.getItem('selectedLanguage');
let currentFlag = localStorage.getItem('selectedFlag');
if (currentLanguage === null) {
  localStorage.setItem('selectedLanguage', 'EN');
  localStorage.setItem('selectedFlag', 'English');
}
else {
  selectedLanguage.innerHTML = currentFlag;
  let flagUrl = `./images/icons/flags/${currentLanguage}.svg`;
  if (!document.currentScript.baseURI.includes('index'))
    flagUrl = `../images/icons/flags/${currentLanguage}.svg`;
  if (document.currentScript.baseURI.includes('projects'))
    flagUrl = `../../images/icons/flags/${currentLanguage}.svg`;
  selectedFlag.src = flagUrl;
}

dropdown.addEventListener('click', () => {
  list.classList.toggle('show');
});


language.forEach(el => {
  el.addEventListener('click', languageSwitcher);
})

function languageSwitcher(e) {
  let img = e.currentTarget.querySelector('img');
  let txt = e.currentTarget.querySelector('.text'); 
  
  selectedFlag.src = img.src;
  selectedLanguage.innerHTML = txt.innerHTML;
  // Change the body style by accessing the first element of the list
  let body = document.getElementsByTagName('body')[0];

  switch(selectedLanguage.innerHTML) {
    case 'English':
      localStorage.setItem('selectedLanguage', 'EN');
      localStorage.setItem('selectedFlag', 'English');
      body.style.fontFamily = "Merriweather, serif";
      break;
    case 'Français':
      localStorage.setItem('selectedLanguage', 'FR');
      localStorage.setItem('selectedFlag', 'Français');
      body.style.fontFamily = "Merriweather, serif";
      break;
    default:
      localStorage.setItem('selectedLanguage', 'JP');
      localStorage.setItem('selectedFlag', '日本語');
      body.style.fontFamily = "Noto Sans JP, sans-serif";
  }
  currentLanguage = localStorage.getItem('selectedLanguage');
  currentFlag = localStorage.getItem('selectedFlag');
}  