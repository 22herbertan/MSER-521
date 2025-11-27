// set initial image position
let currentPosition = 0;
// set gap between images
const gap = 10;
// set image size
const slideWidth = 400;

// target image & save in variable
const items = document.querySelectorAll('.carousel-item'); 
// return the total number of images & save in variable
const totalSlides = items.length;

// move carousel to the next image
function moveForward() {
  if (currentPosition >= totalSlides - 2) { 
    currentPosition = 0;
  } else {
    currentPosition++;
  }
  updateCarouselPosition(); // trigger transformation
}
// move carousel to the previous image
function moveBackward() {
  if (currentPosition <= 0) {
    currentPosition = totalSlides - 2;
  } else {
    currentPosition--;
  }
  updateCarouselPosition(); // trigger transformation
}

// calculate and apply the transform
function updateCarouselPosition() {
  const items = document.querySelectorAll('.carousel-item');
  const offset = (slideWidth + gap) * currentPosition;

  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`; // move the image horizontally by offset
  }
}
