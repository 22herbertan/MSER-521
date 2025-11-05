// Your code here.
function toggleMenu() {
    // target button & save in variable
    const burgerButton = document.querySelector("#menu-toggle");
    console.log(burgerButton);
    burgerButton.classList.toggle = "active";
    // target ul element & save in variable
    const nav = document.querySelector("#nav-links");
    console.log(nav);
    nav.classList.toggle("active");
    // turn classes on & off 
}