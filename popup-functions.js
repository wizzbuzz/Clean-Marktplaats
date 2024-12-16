console.log("Test");
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("hide-ads-button");
  button.addEventListener("click", pressedButton);
});

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
  });
}
