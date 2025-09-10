// frontend/assets/js/navbar.js
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseover', function () {
      if (window.innerWidth >= 992) {
        this.classList.add('show');
        this.querySelector('.dropdown-menu').classList.add('show');
      }
    });

    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth >= 992) {
        this.classList.remove('show');
        this.querySelector('.dropdown-menu').classList.remove('show');
      }
    });
  });

  // 🔹 Reset on window resize (important fix)
  window.addEventListener('resize', function () {
    if (window.innerWidth < 992) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
    }
  });
});
