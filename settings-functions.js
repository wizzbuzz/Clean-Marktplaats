// Wait for the DOM to fully load before initializing
document.addEventListener("DOMContentLoaded", () => {
  const donateButton = document.getElementById("donate-button");
  console.log(donateButton);
  donateButton.addEventListener("click", clickedDonateButton);
});

function clickedDonateButton() {
  chrome.tabs.create({ url: "https://buymeacoffee.com/joop1996w" });
}
