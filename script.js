let buttons = document.querySelectorAll(".to-side");
let main = document.querySelector(".main-frame");
let superMain = document.querySelector(".main");
let buttonLeft = buttons[0];
let buttonRight = buttons[1];
let navigationWraps = document.querySelectorAll(".navigation-wrap");
let navigations = document.querySelectorAll(".navigation-item");
let mainWidth = parseFloat(window.getComputedStyle(main).width);
let items = document.querySelectorAll(".item");
let slideCount = 1;
let animationEnd = true;
let pressFlag = false;
let pressPoint = 0;
let upPoint = parseFloat(window.getComputedStyle(main).left);
let startLeftPos = 0
let hiddenPress = false;
let hiddenPressResolve = false;
let hiddenFlagToUp = false;

function switchSlide(index, isAnime = true) {
  if (animationEnd) {
    animationEnd = false;
    if (isAnime) {
      main.style.transition = "0.4s ease-in-out";
    } else {
      main.style.transition = "none";
      animationEnd = true;
    }
    slideCount = index;
    main.style.left = -mainWidth * slideCount + "px";
  }
}

main.ontransitionend = () => {
  main.style.transition = "none";
  animationEnd = true;
  if (slideCount === 0) switchSlide(items.length - 2, false);
  if (slideCount === 7) switchSlide(1, false);
  navigationWraps[0].parentElement.querySelector(".navigation-item--active").classList.remove("navigation-item--active");
  navigations[slideCount - 1].classList.add("navigation-item--active");
  if (hiddenPress) hiddenPressResolve = true;
};

function afterSwitch() {
  if (Math.abs(event.pageX - pressPoint) > 100) {
    event.pageX - pressPoint < 0 ? switchSlide(slideCount + 1) : switchSlide(slideCount - 1);
  } else if (Math.abs(event.pageX - pressPoint) > 0) {
    switchSlide(slideCount);
  } else if (Math.abs(event.pageX - pressPoint) === 0) {
    switchSlide(slideCount,false);
  }
}

function upMouse() {
   if (pressFlag) {
     pressFlag = false;
     afterSwitch(true);
   }
   if (hiddenPress) {
     hiddenPress = false;
     afterSwitch();
     hiddenPressResolve = false;
   } 
}

buttonLeft.onclick = () => switchSlide(slideCount - 1);

buttonRight.onclick = () => switchSlide(slideCount + 1);

for (let i = 0; i < navigations.length; i++) {
  navigationWraps[i].onclick = () => switchSlide(i+1);
}

main.onmousedown = (event) => {
 if (animationEnd) {
   pressFlag = true;
 } else {
   hiddenPress = true;
   hiddenFlagToUp = true;
  }
  upPoint = parseFloat(window.getComputedStyle(main).left);
  pressPoint = event.pageX;
};

main.onmousemove = (event) => {
    if (hiddenPressResolve && hiddenFlagToUp) {
        hiddenFlagToUp = false;
        upPoint = parseFloat(window.getComputedStyle(main).left);
    } 
  if (pressFlag || hiddenPressResolve) {
    main.style.left = event.pageX - pressPoint + upPoint + "px";
  }
};

main.onmouseup = () => {
 upMouse();
}

superMain.onmouseleave = () => {
 upMouse();
};