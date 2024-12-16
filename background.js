console.log("Background script running");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("marktplaats.nl")) {
    console.log("You are on marktplaats.nl");
  }
});
