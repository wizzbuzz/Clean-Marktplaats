console.log("Test");
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("hide-ads-button");
  button.addEventListener("click", pressedButton);
});

let update = setInterval(getAdAmount, 1000);

function getAdAmount() {
  chrome.storage.local.get("adAmount", (updatedResult) => {
    const amountIndicator = document.getElementById("ad-amount-indicator");
    amountIndicator.innerHTML = updatedResult.adAmount;
    console.log(updatedResult);
  });
}

function setIndicator() {
  chrome.storage.local.get("hideAds", (updatedResult) => {
    const onOffIndicator = document.getElementById("on-off-indicator");
    const button = document.getElementById("hide-ads-button");
    onOffIndicator.innerHTML = updatedResult.hideAds == true ? "Aan" : "Uit";
    button.innerHTML = updatedResult.hideAds == true ? "Zet uit" : "Zet aan";
  });
}

function pressedButton() {
  chrome.storage.local.get("hideAds", (result) => {
    // Correctly retrieve the value for "hideAds"
    let hideAdsKey = result.hideAds;

    // Toggle the value: if null, set to true; otherwise, toggle
    let newValue = hideAdsKey == null ? true : !hideAdsKey;

    // Update the storage with the new value
    chrome.storage.local.set({ hideAds: newValue }, () => {
      console.log("Updated hideAds to:", newValue);

      // Optionally, verify by getting the updated value
      chrome.storage.local.get("hideAds", (updatedResult) => {
        console.log("Verified hideAds:", updatedResult.hideAds);
      });
    });

    setIndicator();
  });
}

getAdAmount();
setIndicator();
