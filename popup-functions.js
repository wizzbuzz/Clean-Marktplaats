import {
  setLocalisedText,
  setLocalizationsInHTML,
  clickedLanguageButton,
} from "./global-functions.js";

// Object to store translations for UI elements
let translations = {};

// Update ad amount and language every second
let update = setInterval(async () => {
  translations = await setLocalisedText();

  getAdAmount();
  setLocalizationsInHTML(translations);
  setIndicator();
}, 1000);

// Set initial state indicators after 1 second
let start = setTimeout(() => {
  setIndicator();
}, 1000);

// Wait for the DOM to fully load before initializing
document.addEventListener("DOMContentLoaded", () => {
  // Set translations and localized text
  translations = setLocalisedText();

  // Add click event listener to the hide ads button
  const button = document.getElementById("hide-ads-button");
  button.addEventListener("click", pressedButton);

  // Add click event listener to the language toggle button
  const languageButton = document.getElementById("language-button");
  languageButton.addEventListener("click", async () => {
    console.log("Test");
    await clickedLanguageButton();
    translations = await setLocalisedText();
    setLocalizationsInHTML(translations);
    setIndicator();
  });

  // Fetch the current ad amount and update the indicator
  getAdAmount();
});

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

// Initial calls to fetch ad amount, language, and set localized text
getAdAmount();
translations = setLocalisedText();
setLocalizationsInHTML(translations);
setIndicator();
