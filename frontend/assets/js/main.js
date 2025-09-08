// frontend/assets/js/main.js
// ================================
// Component Loader Script
// Loads HTML components into index.html
// ================================

// List of components to load dynamically
const components = [
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
    "chatbot"
];

// Load each component from /components/ folder
components.forEach(id => {
  fetch(`components/${id}.html`)
    .then(res => res.text())
    .then(data => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = data;
      } else {
        console.warn(`Element with id="${id}" not found in DOM`);
      }
    })
    .catch(err => console.error(`Error loading ${id}:`, err));
});
