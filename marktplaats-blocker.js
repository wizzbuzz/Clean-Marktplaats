let update = setInterval(removeAds, 1000);
let globalHideAds = true;
let adsAmount = 0;

function removeAdElement(i) {
  if (i != null) {
    i.style.display = globalHideAds == true ? "none" : "";
  }
  adsAmount++;
}

function removeAdsByWebsites() {
  let lis = document.getElementsByClassName("hz-Listing hz-Listing--list-item");

  for (const item of lis) {
    const websiteElements = item.getElementsByClassName(
      "hz-Link hz-Link--isolated hz-Listing-sellerCoverLink hz-TextLink"
    );
    const hasWebsiteElements = websiteElements.length > 0;
    if (hasWebsiteElements) {
      removeAdElement(item);
    }
  }
}

function removeCampaignBanners() {
  let lis = document.getElementsByClassName("shipping-campaign-banner");
  for (const item of lis) {
    removeAdElement(item);
    console.log(item);
  }
}

function removeAdvertisements() {
  let lis = document.getElementsByClassName("hz-Banner hz-Banner--fluid");
  for (const item of lis) {
    removeAdElement(item);
  }
}

function removeAdvertisementsOnAdPageBottom() {
  let lisItem = document.getElementById("adsense-for-search");

  removeAdElement(lisItem);
}

function removeAdvertisementsFromCars() {
  let lis = document.getElementsByClassName(
    "hz-Listing hz-Listing--list-item-cars"
  );
  console.log(lis);
  for (const item of lis) {
    const websiteElements = item.getElementsByClassName(
      "hz-Link hz-Link--isolated hz-Listing-sellerCoverLink hz-TextLink"
    );
    const hasWebsiteElements = websiteElements.length > 0;
    if (hasWebsiteElements) {
      removeAdElement(item);
    }
  }
}

function removeAdvertisementsOnAdPageRight() {
  let lis = document.getElementsByClassName("mys-wrapper");

  for (const item of lis) {
    console.log(lis);
    removeAdElement(item);
  }
}

function DebugData() {
  chrome.storage.local.get("hideAds", (result) => {
    console.log(result.hideAds);
  });
}

function getHideAds(callback) {
  let hideAdsStatus = null;
  chrome.storage.local.get("hideAds", (result) => {
    hideAdsStatus = result.hideAds;
    callback(hideAdsStatus);
  });

  return hideAdsStatus;
}

hideAdsCallback = (hideAdsStatus) => {
  console.log("Hide Ads Status:", hideAdsStatus);
  globalHideAds = hideAdsStatus;
};

function setData() {
  chrome.storage.local.set({ adAmount: adsAmount }, () => {
    console.log("Updated adAmount to:", adsAmount);
  });
}

function removeAds() {
  adsAmount = 0;
  getHideAds(hideAdsCallback);
  removeAdsByWebsites(); // Block ad listings
  removeAdvertisements(); // Block general ads
  removeCampaignBanners(); // Block Ad Banners
  removeAdvertisementsOnAdPageBottom();
  removeAdvertisementsOnAdPageRight();

  removeAdvertisementsFromCars(); // Block ad listings
  setData();
  //   DebugData();
}
