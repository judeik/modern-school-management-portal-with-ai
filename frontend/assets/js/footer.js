// <!-- Load Dynamic Links -->
  document.addEventListener("DOMContentLoaded", () => {
    fetch("/frontend/data/footerLinks.json")
      .then(response => response.json())
      .then(data => {
        const currentYear = new Date().getFullYear();

        // Quick Links
        const linksContainer = document.getElementById("footer-links");
        if (linksContainer) {
          data.quickLinks.forEach(link => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${link.url}" class="footer-link">${link.label}</a>`;
            linksContainer.appendChild(li);
          });
        }

        // Social Links
        const socialContainer = document.getElementById("social-links");
        if (socialContainer) {
          data.socialLinks.forEach(social => {
            const a = document.createElement("a");
            a.href = social.url;
            a.className = "footer-social";
            a.setAttribute("aria-label", social.platform);
            a.innerHTML = `<i class="bi ${social.icon}"></i>`;
            socialContainer.appendChild(a);
          });
        }

        // Footer Text
        const copyrightEl = document.getElementById("footer-copyright");
        const noteEl = document.getElementById("footer-note");

        if (copyrightEl) {
          copyrightEl.textContent = data.footerText.copyright.replace("{year}", currentYear);
        }
        if (noteEl) {
          noteEl.textContent = data.footerText.note;
        }
      })
      .catch(error => console.error("Error loading footer data:", error));
  });


