// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

function toggleMenu(ev) {
  // Accessibility:Toggle aria-expanded
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  nav.classList.toggle('active');

  // Prevent event from bubbling up to the body
  ev.stopPropagation();
}

// Close menu when clicking outside of nav-links:
document.body.addEventListener('click', function (ev) {
  if (ev.target.closest('.nav-links')) {
    return;
  }
  hamburger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('active');
});

// Close menu when clicking outside of nav-links:
document.querySelector('.navigation').addEventListener('click', toggleMenu);

// Accordion panel toggle
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Toggle "active" class on the clicked accordion button
    this.classList.toggle("active");

    // Get the associated panel (next sibling)
    var panel = this.nextElementSibling;

    // Toggle the "active" class on the panel to show/hide it via CSS
    panel.classList.toggle("active");
  });
}

// Function to get query parameters by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    const county = getQueryParam('county');
    if (county) {
        const heading = document.querySelector('#section-5 .heading-1.mega');
        if (heading) {
            heading.textContent = county;
        }
    }
});