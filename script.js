let buttons = document.querySelectorAll(".to-side");
let main = document.querySelector(".main-frame");
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
let startLeftPos =0

function switchSlide(index, isAnime = true) {
  if (animationEnd) {
    animationEnd = false;
    if (isAnime) {
      main.style.transition = "0.3s ease-in-out";
    } else {
      main.style.transition = "none";
    }
    slideCount = index;
    main.style.left = -mainWidth * slideCount + "px";
    main.ontransitionend = () => {
      main.style.transition = "none";//???????????????????????
      animationEnd = true;
      if (slideCount === 0) switchSlide(items.length - 2, false);
      if (slideCount === 7) switchSlide(1, false);
      navigationWraps[0].parentElement.querySelector(".navigation-item--active").classList.remove("navigation-item--active");
      navigations[slideCount - 1].classList.add("navigation-item--active");
      animationEnd = true;
      upPoint = parseFloat(window.getComputedStyle(main).left);
    };
  }

}

function arfterSwitch() {
  if (Math.abs(event.pageX - pressPoint) > 100) {
    event.pageX - pressPoint < 0 ? switchSlide(slideCount + 1) : switchSlide(slideCount - 1);
  } else {
    switchSlide(slideCount);
  }

}

buttonLeft.onclick = () => {
  switchSlide(slideCount - 1);
};

buttonRight.onclick = () => {
  switchSlide(slideCount + 1);
};

for (let i = 0; i < navigations.length; i++) {
  navigationWraps[i].onclick = () => {
  switchSlide(i+1);
  };
}

main.onmousedown = (event) => {
  if (animationEnd) {
    pressFlag = true;
    pressPoint = event.pageX;
  }
};

main.onmousemove = (event) => {
  if (pressFlag) {
    main.style.left = event.pageX - pressPoint + upPoint + "px";
  }
};

main.onmouseup = () => {
  if (pressFlag) {
    pressFlag = false;
    arfterSwitch();
   
  }
}

main.onmouseout = () => {
  if (pressFlag) {
    pressFlag = false;
    arfterSwitch(); 
  }
};