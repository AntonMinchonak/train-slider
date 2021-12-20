let buttons = document.querySelectorAll(".to-side");
let main = document.querySelector(".main-frame");
let buttonLeft = buttons[0];
let buttonRight = buttons[1];
let navigationWraps = document.querySelectorAll(".navigation-wrap");
let navigations = document.querySelectorAll(".navigation-item");

let slideCount = 1;
let leftPos;

console.log(window.getComputedStyle(main).left);

buttonLeft.onclick = () => {
  if (slideCount === 1) {
    slideCount = 7;
    main.style.transition = "none";
    main.style.left = -3915,366 + "px";
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


for (let i = 0; i < navigations.length; i++) {
  navigationWraps[i].onclick = () => {
    navigations[slideCount - 1].classList.remove("navigation-item--active");
    main.style.transition = "0.3s ease-in-out";
    main.style.left = -559.376 * (i + 1) + "px";
    navigations[i].classList.add("navigation-item--active");
    slideCount = i + 1;
  };
}

let pressFlag = 0;
let upPoint=0;
let pressPoint;
let prevMod =0
let scrollBan = 0;

main.onmousedown = () => {
  pressPoint = window.event.pageX - 690 - upPoint + prevMod;
  pressFlag = 1

  main.onmousemove = () => {
    console.log(Number(window.getComputedStyle(main).left.replace("px", "")) + " MOUSEMOVE");
    
    if (Number(window.getComputedStyle(main).left.replace("px", "")) > -559.376) {
      if (!scrollBan) {
          console.log( Number(window.getComputedStyle(main).left.replace("px", ""))+ ' NEWROLLBAAAAAAAAAAACK ------------------');
        main.style.left = "-3914.366px";
        prevMod = 0;
        upPoint = 0;
        pressPoint = window.event.pageX - 690 - upPoint + prevMod + 3356.366;
        scrollBan=1;
      }
      
    } else if (Number(window.getComputedStyle(main).left.replace("px", "")) < -3356) {
      if (!scrollBan) {
         console.log( Number(window.getComputedStyle(main).left.replace("px", ""))+ ' NEWROLLNEEEEEEEEXTTTTTTTTTTT ------------------');
        main.style.left = "0px";
        prevMod = 0;
        upPoint = 0;
        pressPoint = window.event.pageX - 690 - upPoint + prevMod - 559.376;
        scrollBan = 1;
      }
    } 

      if (pressFlag === 1) {
        main.style.left = window.event.pageX - 690 - 559.376 - pressPoint + "px";
      } else {
        main.style.left = upPoint + "px";
      }

    if (Number(window.getComputedStyle(main).left.replace("px", "")) > -3355 && Number(window.getComputedStyle(main).left.replace("px", "")) < -560) {
      scrollBan = 0;
    }
    
  }

}
window.onmouseup = () => {
  console.log("-------------- UPMOUSE " +  Number(window.getComputedStyle(main).left.replace("px", "")))
  pressFlag = 0;
  upPoint = window.event.pageX - 690 - 559.376 - pressPoint;
  prevMod = -559.376;
  if (Math.abs(upPoint) - Math.abs(pressPoint) > 279) {
    
  }
};
