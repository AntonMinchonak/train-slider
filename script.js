let buttons = document.querySelectorAll(".to-side");
let main = document.querySelector(".main-frame");
let buttonLeft = buttons[0];
let buttonRight = buttons[1];
let navigations = document.querySelectorAll(".navigation-item");

let slideCount = 1;
let leftPos;

console.log(window.getComputedStyle(main).left);

buttonLeft.onclick = () => {
  if (slideCount === 1) {
    slideCount = 7;
    main.style.transition = "none";
    main.style.left = -3914 + "px";
    navigations[0].classList.remove("navigation-item--active");
  }
  setTimeout(() => {
    main.style.transition = "0.3s ease-in-out";
    slideCount--;
    main.style.left = -559.376 * slideCount + "px";
    navigations[slideCount - 1].classList.add("navigation-item--active");
    navigations[slideCount].classList.remove("navigation-item--active");
  }, 0);
};

buttonRight.onclick = () => {
  if (slideCount === 6) {
    slideCount = 0;
    main.style.transition = "none";
    main.style.left = 0 + "px";
    navigations[5].classList.remove("navigation-item--active");
  }
  setTimeout(() => {
    main.style.transition = "0.3s ease-in-out";
    slideCount++;
    main.style.left = -559.376 * slideCount + "px";
    navigations[slideCount - 1].classList.add("navigation-item--active");
    navigations[slideCount - 2].classList.remove("navigation-item--active");
  }, 0);
};
