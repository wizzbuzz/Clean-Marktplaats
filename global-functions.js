// Fetch and apply localized text based on the selected language
async function setLocalisedText() {
  // Wrap chrome.storage.local.get in a Promise
  const language = await new Promise((resolve) => {
    chrome.storage.local.get("language", (result) => {
      resolve(result.language);
    });
  });

  // Fetch the translations JSON file
  const response = await fetch("localization.json");
  const localizationData = await response.json();

  // Return the translations for the current language
  return localizationData[language];
}

async function getAllStoredData() {
  const storedData = await new Promise((resolve) => {
    chrome.storage.local.get(null, (result) => {
      resolve(result);
    });
  });

  return storedData;
}

// Apply translations to elements in the HTML
function setLocalizationsInHTML(translations) {
  const languageIcon = document.getElementById("language-button");
  console.log(languageIcon);
  languageIcon.src = translations["icon"]; // Update the language button icon
  console.log(languageIcon.src);

  // Update all elements with data-key attributes using translations
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    if (translations[key]) {
      element.textContent = translations[key];
    } else {
      console.warn(`Missing translation for key: "${key}"`);
    }
  });
}

// Handle the language button press to toggle language
async function clickedLanguageButton() {
  await new Promise((resolve) =>
    chrome.storage.local.get("language", (result) => {
      const newLanguage = result.language === "nl" ? "en" : "nl"; // Toggle between Dutch and English
      chrome.storage.local.set({ language: newLanguage }, () => {
        console.log(newLanguage);
        resolve(true);
      });
    })
  );
}

export {
  setLocalisedText,
  getAllStoredData,
  setLocalizationsInHTML,
  clickedLanguageButton,
};
