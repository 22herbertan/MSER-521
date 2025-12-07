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
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 