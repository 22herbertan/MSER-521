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