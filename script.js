let buttons = document.querySelectorAll(".to-side");
let main = document.querySelector(".main-frame");
let buttonLeft = buttons[0];
let buttonRight = buttons[1];
let navigationWraps = document.querySelectorAll(".navigation-wrap");
let navigations = document.querySelectorAll(".navigation-item");
let items = document.querySelectorAll(".item");
let slideCount = 1;
let pressFlag = false;
let pressPoint = 0;
let slideWidth = parseFloat(window.getComputedStyle(main).width);
let previousLeft;
let moveValue;
let switchEnd = true; 

function switchSlide(index, useAnime = true) {
  if (switchEnd) {
     switchEnd = !useAnime;
    if (useAnime) {
      main.style.transition = "0.3s ease-in-out";
    }
    slideCount = index;
    main.style.left = -slideWidth * slideCount + "px";
    if (slideCount !== 0 && slideCount !== 7) {
      navigationWraps[0].parentElement.querySelector(".navigation-item--active").classList.remove("navigation-item--active");
      navigations[slideCount - 1].classList.add("navigation-item--active");
    }
  }
}

function getNearSlide() {
  if (Math.abs(moveValue) < 100) {
    return slideCount
  } 
  return moveValue > 0 ? slideCount - 1 : slideCount + 1;
}

main.ontransitionend = () => {
  switchEnd = true;
  main.style.transition = "none";
  if (slideCount === 0) {
    switchSlide(items.length - 2, false);
  }
  if (slideCount === items.length - 1) {
    switchSlide(1, false);
  }
};

buttonLeft.onclick = () => switchSlide(slideCount - 1);
buttonRight.onclick = () => switchSlide(slideCount + 1);

for (let i = 1; i < items.length - 1; i++) {
  navigationWraps[i - 1].onclick = () => switchSlide(i);
}

main.onmousedown = (event) => {
  if (switchEnd) {
    previousLeft = parseFloat(window.getComputedStyle(main).left);
    pressFlag = true;
    pressPoint = event.pageX;
  }
}

main.onmousemove = event => {
  if (pressFlag) {
    moveValue = event.pageX - pressPoint;
    main.style.left = (moveValue + previousLeft) + "px";
  }
}

main.onmouseup = () => {
  if (pressFlag) {
    pressFlag = false;
    switchSlide(getNearSlide());
  }
};

main.onmouseout = () => {
  if (pressFlag) {
    pressFlag = false;
    switchSlide(getNearSlide());
  }
};