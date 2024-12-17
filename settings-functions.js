import {
  setLocalisedText,
  setLocalizationsInHTML,
  clickedLanguageButton,
} from "./global-functions.js";

let translations = {};

// Wait for the DOM to fully load before initializing
document.addEventListener("DOMContentLoaded", async () => {
  const donateButton = document.getElementById("donate-button");
  donateButton.addEventListener("click", clickedDonateButton);
  translations = await setLocalisedText();

  // Add click event listener to the language toggle button
  const languageButton = document.getElementById("language-button");
  languageButton.addEventListener("click", async () => {
    console.log("Test");
    await clickedLanguageButton();
    translations = await setLocalisedText();
    setLocalizationsInHTML(translations);
  });

  setLocalizationsInHTML(translations);
});

function clickedDonateButton() {
  chrome.tabs.create({ url: "https://buymeacoffee.com/joop1996w" });
}
