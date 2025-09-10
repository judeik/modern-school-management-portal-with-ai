// assets/js/includeSocial.js
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("social-media-container");

  if (container) {
    fetch("components/socialMedia.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
      })
      .catch(error => console.error("Error loading social media:", error));
  } else {
    console.warn("⚠️ social-media-container not found in DOM.");
  }
});
