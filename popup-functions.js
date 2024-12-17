// Object to store translations for UI elements
let translations = {};

// Update ad amount and language every second
let update = setInterval(() => {
  getAdAmount();
  getLanguage();
}, 1000);

// Set initial state indicators after 1 second
let start = setTimeout(() => {
  setIndicator();
}, 1000);

// Wait for the DOM to fully load before initializing
document.addEventListener("DOMContentLoaded", () => {
  // Set translations and localized text
  setLocalisedText();

  // Add click event listener to the hide ads button
  const button = document.getElementById("hide-ads-button");
  button.addEventListener("click", pressedButton);

  // Add click event listener to the language toggle button
  const languageButton = document.getElementById("language-button");
  languageButton.addEventListener("click", clickedLanguageButton);

  const donateButton = document.getElementById("donate-button");
  donateButton.addEventListener("click", clickedDonateButton);

  // Fetch the current ad amount and update the indicator
  getAdAmount();
});

// Handle the language button press to toggle language
function clickedLanguageButton() {
  chrome.storage.local.get("language", (result) => {
    const newLanguage = result.language === "nl" ? "en" : "nl"; // Toggle between Dutch and English
    chrome.storage.local.set({ language: newLanguage }, () => {
      // Update UI with the new language
      setLocalisedText();
    });
  });
}

// Fetch and display the current number of ads
function getAdAmount() {
  chrome.storage.local.get("adAmount", (updatedResult) => {
    const amountIndicator = document.getElementById("ad-amount-indicator");
    amountIndicator.innerHTML = updatedResult.adAmount;
  });
}

// Update the UI indicators for hide ads functionality
function setIndicator() {
  chrome.storage.local.get("hideAds", (updatedResult) => {
    const onOffIndicator = document.getElementById("on-off-indicator");
    const button = document.getElementById("hide-ads-button");

    // Update indicators and button text based on hideAds value
    onOffIndicator.innerHTML =
      updatedResult.hideAds == true
        ? translations.onOffIndicatorValue["on"]
        : translations.onOffIndicatorValue["off"];
    button.innerHTML =
      updatedResult.hideAds == true
        ? translations.buttonText["turnOff"]
        : translations.buttonText["turnOn"];
  });
}

// Handle the hide ads button press to toggle visibility
function pressedButton() {
  console.log("Pressed button!");
  chrome.storage.local.get("hideAds", (result) => {
    // Retrieve the current state of hideAds
    let hideAdsKey = result.hideAds;

    // Toggle the hideAds state
    let newValue = hideAdsKey == null ? true : !hideAdsKey;

    // Save the updated hideAds state
    chrome.storage.local.set({ hideAds: newValue }, () => {
      // Verify the updated value and log it
      chrome.storage.local.get("hideAds", (updatedResult) => {
        console.log("Verified hideAds:", updatedResult.hideAds);
      });

      // Update the UI indicators
      setIndicator();
    });
  });
}

// Ensure the language is set, defaulting to Dutch if undefined
function getLanguage() {
  chrome.storage.local.get("language", (result) => {
    if (result.language == undefined) {
      chrome.storage.local.set({ language: "nl" }, () => {
        console.log("Language set to Dutch!");
      });
    }
  });
}

// Apply translations to elements in the HTML
function setLocalizationsInHTML() {
  const logo = document.getElementById("language-button");
  logo.src = translations["icon"]; // Update the language button icon

  // Update all elements with data-key attributes using translations
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    if (translations[key]) {
      element.textContent = translations[key];
    } else {
      console.warn(
        `Missing translation for key: "${key}" in language: "${language}"`
      );
    }
  });
}

// Fetch and apply localized text based on the selected language
function setLocalisedText() {
  chrome.storage.local.get("language", async (result) => {
    const language = result.language;

    console.log(language);

    // Fetch the translations JSON file
    const response = await fetch("localization.json");
    const localizationData = await response.json();

    // Set the translations for the current language
    translations = localizationData[language];

    // Apply translations to the UI and update indicators
    setLocalizationsInHTML();
    setIndicator();
  });
}

// Initial calls to fetch ad amount, language, and set localized text
getAdAmount();
getLanguage();
setLocalisedText();
