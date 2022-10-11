const frame = document.querySelector(".frame");
const slides = document.querySelector(".slides");
const buttons = document.querySelectorAll(".button");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const slideItems = document.querySelectorAll(".slide");
const slider = document.querySelectorAll(".slider");
const pages = document.querySelectorAll(".page-wrap");
const pageDots = document.querySelectorAll(".page");
const slideWidth = parseFloat(window.getComputedStyle(slideItems[0]).width) + parseInt(window.getComputedStyle(slideItems[0]).padding) * 2 + parseInt(window.getComputedStyle(slides).gap);
frame.style.width = slideWidth - 10 + "px";
slides.style.right = parseFloat(window.getComputedStyle(slideItems[0]).width) + parseInt(window.getComputedStyle(slideItems[0]).padding) * 2 + parseInt(window.getComputedStyle(slides).gap) + "px";
let currentSlide = 1;
let animationOver = true;
let downPoint = 0;
let startPos = parseFloat(window.getComputedStyle(slides).right);
let isPressed = false;
let difference = 0;
let hiddenPress = false;
const diffBorder = ~~(slideWidth / 4);

function switchSlide(target, static = false) {
  if (!animationOver) return;
  if (!static) {
    slides.style.transition = "0.25s ease-in-out";
    animationOver = false;
  } else {
    slides.style.transition = "";
    animationOver = true;
  }
  currentSlide = target;
  slides.style.right = currentSlide * slideWidth + "px";
  highlightPage();
}

function highlightPage() {
  pageDots.forEach((item) => item?.classList.remove("active-page"));
  pageDots[currentSlide - 1]?.classList.add("active-page");
}

function afterSlide() {
  slides.style.transition = "";
  animationOver = true;
  if (currentSlide < 1) switchSlide(slideItems.length - 2, true);
  if (currentSlide > slideItems.length-2) switchSlide(1, true);
  startPos = parseFloat(window.getComputedStyle(slides).right);
}

function onMouseDown(evt) {
  if (animationOver) slides.style.transition = "";
  startPos = parseFloat(window.getComputedStyle(slides).right);
  downPoint = evt.clientX;
  if (!animationOver) {
    hiddenPress = true;
    return;
  }
  isPressed = true;
}

function onMouseMove(evt) {
  if ((!isPressed && !hiddenPress) || !animationOver) return;
  difference = downPoint - evt.clientX;
  slides.style.right = difference + startPos + "px";
}

function onMouseUp(evt) {
  if (!isPressed && !hiddenPress) return;
  isPressed = false;
  hiddenPress = false;
  if (difference > diffBorder) switchSlide(currentSlide + 1);
  else if (difference <= -diffBorder) switchSlide(currentSlide - 1);
  else if (difference === 0) switchSlide(currentSlide, true);
  else switchSlide(currentSlide);
  difference = 0;
}

highlightPage();
buttons.forEach((item) => (item.onclick = () => switchSlide(currentSlide + ~~item.dataset.direction)));
slides.ontransitionend = afterSlide;
slides.onmousedown = (evt) => onMouseDown(evt);
slides.onmousemove = (evt) => onMouseMove(evt);
slides.onmouseup = (evt) => onMouseUp(evt);
slides.onmouseleave = (evt) => onMouseUp(evt);
pages.forEach((item, index) => (item.onclick = () => (index + 1 !== currentSlide ? switchSlide(index + 1) : "")));
