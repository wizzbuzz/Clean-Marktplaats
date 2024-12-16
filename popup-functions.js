let translations = {};

let update = setInterval(() => {
  getAdAmount();
  getLanguage();
}, 1000);

let start = setTimeout(() => {
  setIndicator();
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  // Initialize language and set translations
  setLocalisedText();

  // Set up button event listeners
  const button = document.getElementById("hide-ads-button");
  button.addEventListener("click", pressedButton);

  const languageButton = document.getElementById("language-button");
  languageButton.addEventListener("click", pressedLanguageButton);

  // Initialize other indicators
  getAdAmount();
});

function pressedLanguageButton() {
  chrome.storage.local.get("language", (result) => {
    const newLanguage = result.language === "nl" ? "en" : "nl";
    chrome.storage.local.set({ language: newLanguage }, () => {
      // Update translations and UI
      setLocalisedText();
    });
  });
}

function getAdAmount() {
  chrome.storage.local.get("adAmount", (updatedResult) => {
    const amountIndicator = document.getElementById("ad-amount-indicator");
    amountIndicator.innerHTML = updatedResult.adAmount;
  });
}

function setIndicator() {
  console.log(translations);
  chrome.storage.local.get("hideAds", (updatedResult) => {
    const onOffIndicator = document.getElementById("on-off-indicator");
    const button = document.getElementById("hide-ads-button");

    onOffIndicator.innerHTML =
      updatedResult.hideAds == true
        ? translations.onOffIndicatorValue["on"]
        : translations.onOffIndicatorValue["off"];
    button.innerHTML =
      updatedResult.hideAds == true
        ? translations.buttonText["turnOn"]
        : translations.buttonText["turnOff"];
  });
}

function pressedButton() {
  console.log("Pressed button!");
  chrome.storage.local.get("hideAds", (result) => {
    // Correctly retrieve the value for "hideAds"
    let hideAdsKey = result.hideAds;

    // Toggle the value: if null, set to true; otherwise, toggle
    let newValue = hideAdsKey == null ? true : !hideAdsKey;

    // Update the storage with the new value
    chrome.storage.local.set({ hideAds: newValue }, () => {
      // Optionally, verify by getting the updated value
      chrome.storage.local.get("hideAds", (updatedResult) => {
        console.log("Verified hideAds:", updatedResult.hideAds);
      });

      setIndicator();
    });
  });
}

function getLanguage() {
  chrome.storage.local.get("language", (result) => {
    if (result.language == undefined) {
      chrome.storage.local.set({ language: "nl" }, () => {
        console.log("Language set to Dutch!");
      });
    }
  });
}

function setLocalizationsInHTML() {
  const logo = document.getElementById("language-button");
  logo.src = translations["icon"];

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

function setLocalisedText() {
  chrome.storage.local.get("language", async (result) => {
    const language = result.language;

    console.log(language);

    const response = await fetch("translations.json");
    const localizationData = await response.json();

    translations = localizationData[language];

    setLocalizationsInHTML();
    setIndicator();
  });
}

getAdAmount();
getLanguage();
setLocalisedText();
