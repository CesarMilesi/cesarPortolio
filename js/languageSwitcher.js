/* Asynchronously fetches JSON content for the specified page and updates translations.
This method fetches multiple JSON files, merges their contents,
and updates the translations data property with the merged data.
Parameters:
    - pageName: The name of the page for which JSON content is being fetched.
                This determines the directory from which JSON files are fetched.

    Side Effects: Updates the translations (datai18n) data property with merged JSON content.
                Calls the updateContent method to update the page content.
*/
async function fetchJsonContent(pageName) {
    let startUrl = '';
    let baseUri = window.location.href;
    switch (baseUri != null) {
        case (baseUri.match("index") != null):
            startUrl = '.';
            break;
        case (baseUri.match("projects") != null):
            startUrl = '../..';
            break;
        default:
            startUrl = '..';
            break;
    }
    
    const baseDirectory = startUrl;
    // const baseDirectory = pageName === 'index' ? '.' : '..';
    const jsonFiles = ['nav', pageName, 'footer', 'cookies'];

    /* Asynchronously fetches JSON content for all JSON files associated with the current page.
        * This block uses Promise.all() to concurrently fetch JSON files (nav, pagename & footer) for each file in the jsonFiles array.
        * Each JSON file is fetched using fetch() and its response is checked for errors.
        * If the response is not ok, an HTTP error is thrown.
        * Once all JSON files are fetched successfully, their JSON data is extracted and stored in the results array.
        */
    try {
        const results = await Promise.all(jsonFiles.map(async jsonFile => {
            let file = '';
            switch (jsonFile != null) {
                case (jsonFile.match("Project") != null):
                    file = 'projects/' + jsonFile;
                    break;
                case (jsonFile.match('') === null):
                    file = 'index';
                    break;
                default:
                    file = jsonFile;
                    break;
            }
            // let file = jsonFile === '' ? 'index' : jsonFile;
            const filePath = `${baseDirectory}/json/${file}.json`;
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }         
            return response.json();
        }));

        /* Merge translations from all fetched JSON files.
        * This block iterates over each JSON file's data in the results array.
        * For each language in the JSON data, it merges the translations into the mergedTranslations object.
        * If a translation for a language already exists in mergedTranslations, it is merged with the new translations.
        * The resulting mergedTranslations object contains translations from all JSON files, merged by language.
        */
        const mergedTranslations = {};
        results.forEach(data => {
            Object.entries(data).forEach(([language, translations]) => {
                mergedTranslations[language] = { ...mergedTranslations[language], ...translations };
            });
        });

        this.translations = mergedTranslations;
        this.updateContent();
    } catch (error) {
        console.error('Error fetching JSON content:', error);
    }
}

/* Updates the content of elements with data-i18n attribute based on translations.
* This method sets the lang attribute of the HTML root element to the selected language
* and updates the innerHTML of elements with data-i18n attribute to display translated text.
* It retrieves translations for the selected language and applies them to the corresponding elements.
*/
function updateContent() {
    if (this.translations) {
        // Set HTML lang attribute to selected language
        document.documentElement.lang = this.selectedLanguage.innerHTML;
        // Iterate over elements with data-i18n attribute (over all the elements that need to be translated)
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            // Retrieve translation for the current key in the selected language,
            // or use the key itself as a fallback if no translation is available.
            const translation = this.translations[this.selectedLanguage.innerHTML]?.[key] || key;

            // Check for missing data-i18n keys
            if (!this.translations[this.selectedLanguage.innerHTML]?.[key]) {
                console.warn(`data-i18n key '${key}' does not have an equivalent in the JSON file.`);
            }
            element.innerHTML = translation;
        });
        // Check for missing keys in JSON files
        const languageTranslations = this.translations[this.selectedLanguage.innerHTML];
        Object.keys(languageTranslations).forEach(key => {
            if (!document.querySelector(`[data-i18n="${key}"]`)) {
            console.warn(`Key '${key}' in language '${this.selectedLanguage.innerHTML}' JSON file does not have an equivalent data-i18n in the HTML.`);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Extracts the current page name from the URL and removes the .html extension,
    // then initiates the fetching of JSON content for the current page.
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    this.fetchJsonContent(currentPage);
});

// Watches for changes in the selectedLanguage property,
// and calls the updateContent method whenever it changes.
let actualLanguage = document.querySelectorAll('.language');
let languageToStore = this.selectedLanguage.innerHTML;
actualLanguage.forEach(la => {
    la.addEventListener('click', () => {
        this.updateContent();
        switch(this.selectedLanguage.innerHTML) {
            case 'English':
                languageToStore = 'EN';
                break;
            case 'Français':
                languageToStore = 'FR';
                break;
            default:
                languageToStore = 'JP';
        }
        // Store selected language in local storage
        localStorage.setItem('selectedLanguage', languageToStore);
})});