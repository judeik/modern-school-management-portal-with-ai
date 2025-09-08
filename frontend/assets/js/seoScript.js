// frontend/assets/js/seoScript.js
// Base schemas for school and company
const seoData = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Secondary School Portal",
    "url": "https://schoolportal.com",
    "logo": "https://schoolportal.com/logo.png",
    "description": "A modern secondary school management portal providing digital learning, AI-powered assistance, and a seamless experience for students, parents, and staff.",
    "sameAs": [
      "https://facebook.com/YourPage",
      "https://twitter.com/YourPage",
      "https://linkedin.com/company/YourPage",
      "https://instagram.com/YourPage"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "YourCompany - Web & AI Solutions",
    "url": "https://yourcompany.com",
    "logo": "https://yourcompany.com/logo.png",
    "description": "We provide modern web solutions and AI-powered platforms for businesses and educational institutions.",
    "sameAs": [
      "https://linkedin.com/company/yourcompany",
      "https://twitter.com/yourcompany"
    ]
  }
];

// ✅ Generate Breadcrumbs (Visible + JSON-LD)
function generateBreadcrumbs() {
  const path = window.location.pathname.split("/").filter(Boolean);
  const origin = window.location.origin;

  // Always add Home
  const items = [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": origin + "/"
  }];

  // Build remaining path
  path.forEach((segment, index) => {
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    const itemUrl = `${origin}/${path.slice(0, index + 1).join("/")}`;

    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": itemUrl
    });
  });

  // JSON-LD BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  // Inject JSON-LD into <head>
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script);

  // ✅ Visible Breadcrumb Navigation
  const breadcrumbNav = document.getElementById("breadcrumb-nav");
  if (breadcrumbNav) {
    breadcrumbNav.innerHTML = "";

    items.forEach((item, idx) => {
      const li = document.createElement("li");
      li.classList.add("breadcrumb-item");

      if (idx === items.length - 1) {
        li.classList.add("active");
        li.setAttribute("aria-current", "page");
        li.textContent = item.name;
      } else {
        const a = document.createElement("a");
        a.href = item.item;
        a.textContent = item.name;
        li.appendChild(a);
      }

      breadcrumbNav.appendChild(li);
    });
  }
}

// ✅ Load all schemas (school, company, breadcrumbs)
[...seoData].forEach(schema => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
});

// Run on page load
document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
