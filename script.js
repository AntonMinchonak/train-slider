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
      console.log("buttonleft");
    console.log("slideCount " + slideCount);
    upPoint = -559.376 * slideCount;
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
    console.log("buttoright");
    console.log("slideCount " + slideCount);
     upPoint = -559.376 * slideCount;
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
let startLeftPos;

main.onmousedown = () => {
  
   main.style.transition = "";
  pressPoint = window.event.pageX - 690 - upPoint + prevMod; //  Расчёт места нажатия (положительное значение). Значение всегда больше 0
  pressFlag = 1;
  startLeftPos = Number(window.getComputedStyle(main).left.replace("px", ""))
  console.log("PRESSED: " + 'left:' + Number(window.getComputedStyle(main).left.replace("px", "")) + 'px' + ' pressPoint: ' + pressPoint);
  console.log(slideCount + ' countSlide')
  console.log(window.event.pageX + " pageX");
   console.log(upPoint + " UPpoint");
  console.log(window.event.pageX + " prevmod");
  
  main.onmousemove = () => {
    console.log("MOVE " + Number(window.getComputedStyle(main).left.replace("px", "")) + 'px')

    ////// LOOP FOR FREE MODE //////
    // if (Number(window.getComputedStyle(main).left.replace("px", "")) > -500) {
    //       console.log( Number(window.getComputedStyle(main).left.replace("px", ""))+ ' NEWROLLBAAAAAAAAAAACK');
    //     main.style.left = -559.376 * 14 + "-3256px"; //-3256 px for free
    //     prevMod = 0;
    //     upPoint = 0;
    //     pressPoint = window.event.pageX - 690 - upPoint + prevMod + 3296.366;
    // }

    // if (Number(window.getComputedStyle(main).left.replace("px", "")) < -3900) {
    //      console.log( Number(window.getComputedStyle(main).left.replace("px", ""))+ ' NEWROLLNEEEEEEEEXTTTTTTTTTTT');
    //     main.style.left = "-500px"; //-500px for free
    //     prevMod = 0;
    //     upPoint = 0;
    //     pressPoint = window.event.pageX - 690 - upPoint + prevMod -10.376;
    // }

    if (pressFlag === 1) {
      main.style.left = window.event.pageX - 690 - 559.376 - pressPoint + "px"; // 1) При наведении и нажатии на main, положение main определяется положением курсора. 2) Но main находится на удалении 690px от начала страницы, поэтому чтобы начальная точка main (690px) соответствовала 0px, отнимается 690px. 3) Т.к. [0] карточка - под номером 6, а нам нужно, чтобы начинался отсчёт с 1-го номера, онимаем размер карточки -559.336px. 4) PressPoint см.выше. При движении мыши влево, отрицательное значение увеличивается, т.к. единственное положительное значение window.event.pageX, уменьшается, из-за этого maim уходит в больший минус и двигается влево
    }
    console.log("slideCount " + slideCount);
  };
}

main.onmouseup = () => {
  if (pressFlag === 1) {
    endslide();
  }
}

main.onmouseout = () => {
  if (pressFlag === 1) {
    endslide();
  }
};

function endslide() {
  pressFlag = 0;
  upPoint = Number(window.getComputedStyle(main).left.replace("px", "")); // Определяется место отжатия (отицательное значение).
  prevMod = -559.376;
  console.log("UPMOUSE: " +"left:" +Number(window.getComputedStyle(main).left.replace("px", "")) +"px" +" upPoint: " +upPoint);
console.log("slideCount " + slideCount);
  ////// LOOP FOR AUTO-POSTSCROLL MODE //////

    let minDiffItem = -559.376 * 7;
    let minItemIndex;
    let prevCount = 0;

    if (Math.abs(Math.abs(startLeftPos) - Math.abs(upPoint)) > 100) {
      if (Math.abs(startLeftPos) - Math.abs(upPoint) > 0) {
        console.log("TOLEFT +" + (Math.abs(startLeftPos) - Math.abs(upPoint)));
        for (let i = 0; i < 8; i++) {
          let compareItem = -559.376 * i;
          let differenceItem = startLeftPos - compareItem;

          if (Math.abs(differenceItem) < Math.abs(minDiffItem)) {
            minDiffItem = differenceItem;
            minItemIndex = i;
          }
        }

        main.style.transition = "0.3s ease-in-out";
        main.style.left = -559.376 * (minItemIndex - 1) + "px";
        slideCount = minItemIndex - 1;
        upPoint = -559.376 * (minItemIndex - 1);
  
      console.log("slideCount: " + slideCount + ', left:' + Number(window.getComputedStyle(main).left.replace("px", "")));
          main.ontransitionend = function () {
             if (Number(window.getComputedStyle(main).left.replace("px", "")) > -559.376) {
          slideCount = 6;
          navigations[5].classList.add("navigation-item--active");
             main.style.transition = "none";
            console.log(Number(window.getComputedStyle(main).left.replace("px", "")) + " NEWROLLBAAAAAAAAAAACK");
            main.style.left = "-3356px";
            upPoint = -559.376 * 6;
            pressPoint = window.event.pageX - 690 - upPoint + prevMod + 3296.366;
          }
            };
       
      } else if (Math.abs(startLeftPos) - Math.abs(upPoint) < 0) {
        console.log("TORIGHT +");
        for (let i = 0; i < 8; i++) {
          let compareItem = -559.376 * i;
          let differenceItem = startLeftPos - compareItem;
console.log("slideCount: " + slideCount + ', left:' + Number(window.getComputedStyle(main).left.replace("px", "")));
          if (Math.abs(differenceItem) < Math.abs(minDiffItem)) {
            minDiffItem = differenceItem;
            minItemIndex = i;
          }
        }
        main.style.transition = "0.3s ease-in-out";
        main.style.left = -559.376 * (minItemIndex + 1) + "px";
        slideCount = minItemIndex + 1;
        upPoint = -559.376 * (minItemIndex + 1);
console.log("slideCount: " + slideCount + ', left:' + Number(window.getComputedStyle(main).left.replace("px", "")));
      
          main.ontransitionend = function () {
              if (Number(window.getComputedStyle(main).left.replace("px", "")) < -3356) {
        
            slideCount = 1;
          navigations[0].classList.add("navigation-item--active");
            main.style.transition = "none";
            console.log(Number(window.getComputedStyle(main).left.replace("px", "")) + " NEWROLLBAAAAAAAAAAACK");
            main.style.left = "0px";
            upPoint = -559.376 * 0;
                pressPoint = window.event.pageX - 690 - upPoint + prevMod + 3296.366;
            }    
          }
        console.log("slideCount: " + slideCount + ', left:' + Number(window.getComputedStyle(main).left.replace("px", "")));
      }
    } else {
      if (Math.abs(startLeftPos) - Math.abs(upPoint) > 0) {
        console.log("TOLEFT -");
        for (let i = 0; i < 8; i++) {
          let compareItem = -559.376 * i;
          let differenceItem = startLeftPos - compareItem;

          if (Math.abs(differenceItem) < Math.abs(minDiffItem)) {
            minDiffItem = differenceItem;
            minItemIndex = i;
          }
        }
        main.style.transition = "0.3s ease-in-out";
        main.style.left = -559.376 * minItemIndex + "px";
        slideCount = minItemIndex;
        upPoint = -559.376 * minItemIndex;
      } else if (Math.abs(startLeftPos) - Math.abs(upPoint) < 0) {
        console.log("TORIGHT -");
        for (let i = 0; i < 8; i++) {
          let compareItem = -559.376 * i;
          let differenceItem = startLeftPos - compareItem;

          if (Math.abs(differenceItem) < Math.abs(minDiffItem)) {
            minDiffItem = differenceItem;
            minItemIndex = i;
          }
        }
        main.style.transition = "0.3s ease-in-out";
        main.style.left = -559.376 * minItemIndex + "px";
        slideCount = minItemIndex;
        upPoint = -559.376 * minItemIndex;
      }
    }
    console.log(slideCount);
    console.log(prevCount);

    for (let i = 0; i < 6; i++) {
      navigations[i].classList.remove("navigation-item--active");
    }
    navigations[slideCount - 1].classList.add("navigation-item--active");
  if (!upPoint) {
    upPoint = (slideCount + 1) * -559.376;
  }
  ////////////

};
