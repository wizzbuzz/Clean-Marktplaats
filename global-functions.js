console.log("Global functions online!");

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

export { setLocalisedText };
