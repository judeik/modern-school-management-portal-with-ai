// ================================
// main.js - Component Loader Script
// Loads HTML components into index.html
// ================================

// List of components to load dynamically
const components = [
    "header",
    // "socialMedia",
    "navbar",
    "hero",
    "welcomeMessage",
    "quick-links",
    "about",
    "features",
    "announcements",
    "gallery",
    "contact",
    "callToAction",
    "footer",
    "breadcrumb",
    "chatbot" // Chatbot component
];

// Helper: Load external script after component injection
function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);
}

// Load each component from /components/ folder
components.forEach(id => {
  fetch(`components/${id}.html`)
    .then(res => res.text())
    .then(data => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = data;

        // ✅ If chatbot is loaded, load its logic and initialize
        if (id === "chatbot") {
          loadScript("assets/js/chatbot.js");

          // Small delay to ensure script loads, then call initChatbot
          setTimeout(() => {
            window.initChatbot?.();
          }, 50);
        }
      } else {
        console.warn(`Element with id="${id}" not found in DOM`);
      }
    })
    .catch(err => console.error(`Error loading ${id}:`, err));
});
