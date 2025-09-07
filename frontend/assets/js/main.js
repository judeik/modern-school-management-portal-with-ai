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
    "contact",
    "footer",
    "chatbot"
];

// Load each component from /components/ folder
components.forEach(id => {
    fetch(`components/${id}.html`)
        .then(res => res.text())
        .then(data => {
        document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(`Error loading ${id}:`, err));
});
