function createSlider(options) {
  let slideCount = options.slideCount || 1;
  for (let key in options?.slideCount) {
    if (window.innerWidth > +key) slideCount = options?.slideCount[key];
  }
  const scrolledSlides = options?.scrolledSlides || 1;
  let currentSlide = 1 * slideCount;
  let [slider, frame, slides, slideItems, buttons, trueSlidesNumber, pagination] = createSliderBlock(options.definer);
  createCopies();
  const [pages, pageDots] = createBreadcrumbs();
  highlightPage();
  const isWrongScroll = trueSlidesNumber % scrolledSlides > 0;
  const slideWidth = slideItems[0].getBoundingClientRect().width + parseInt(window.getComputedStyle(slides).gap);
  frame.style.width = slideWidth * slideCount - parseInt(window.getComputedStyle(slides).gap) + "px";
  slides.style.right = slideWidth * slideCount + "px";
  const diffBorder = ~~(slideWidth / 1.3);
  let animationOver = true;
  let downPoint = 0;
  let startPos = parseFloat(window.getComputedStyle(slides).right);
  let isPressed = false;
  let difference = 0;
  let hiddenPress = false;
  if (options.autoplay) setInterval(() => switchSlide(currentSlide + scrolledSlides), options.autoplay.time || 2000);

  function switchSlide(target, static = false) {
    let standCurrentSlide = currentSlide === target;
    const standCurrentXPos = currentSlide * slideWidth + "px" === slides.style.right;
    if (!animationOver || isPressed || (standCurrentSlide && standCurrentXPos && !static)) return;
    if (!static) {
      slides.style.transition = `${options.scrollSpeed}s ease-in-out`;
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
    let correctSlide = (currentSlide - slideCount) / scrolledSlides;
    pageDots[correctSlide]?.classList.add("active-page");
  }

  function afterSlide() {
    slides.style.transition = "";
    animationOver = true;
    if (currentSlide < slideCount) {
      !isWrongScroll ? switchSlide(currentSlide + trueSlidesNumber, true) : switchSlide(slideItems.length - slideCount * 2 - (trueSlidesNumber % scrolledSlides));
    } else if (currentSlide > slideCount + trueSlidesNumber - 1) {
      !isWrongScroll ? switchSlide(currentSlide - trueSlidesNumber, true) : switchSlide(slideCount);
    }
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
    difference = downPoint - (evt.clientX ? evt.clientX : evt.targetTouches[0].clientX);
    slides.style.right = difference + startPos + "px";
  }

  function onMouseUp() {
    if (!isPressed && !hiddenPress) return;
    isPressed = false;
    hiddenPress = false;
    if (scrolledSlides > 1) {
      if (difference > diffBorder) switchSlide(currentSlide + scrolledSlides);
      else if (difference <= -diffBorder) switchSlide(currentSlide - scrolledSlides);
    } else {
      for (let n = slideCount; n > 0; n--) {
        if (difference > slideWidth * n - diffBorder) {
          switchSlide(currentSlide + n);
          break;
        } else if (difference <= -slideWidth * n + diffBorder) {
          switchSlide(currentSlide - n);
          break;
        }
      }
    }
    switchSlide(currentSlide);
    difference = 0;
  }

  function createSliderBlock(definer) {
    const slider = document.querySelector(definer);
    slider.classList.add("slider-block");
    const sliderArea = document.createElement("div");
    sliderArea.classList.add("slider");
    const frame = document.createElement("div");
    frame.classList.add("slider__frame");
    const slides = document.createElement("div");
    slides.classList.add("slider__slides");
    const buttons = [document.createElement("button"), document.createElement("button")];
    const pagination = document.createElement("div");
    pagination.classList.add("slider__pagination");
    let slideItems = [...slider.children];
    const trueSlidesNumber = slideItems.length;
    slideItems.forEach((item) => {
      const sliderSlide = document.createElement("div");
      sliderSlide.classList.add("slider__slide");
      sliderSlide.append(item);
      slides.append(sliderSlide);
    });
    frame.append(slides);
    sliderArea.append(frame);
    buttons.forEach((button, i) => {
      button.classList.add("slider__button");
      options.buttons && options.buttons[i] ? (button.innerHTML = options.buttons[i]) : "";
      if (i === 0) {
        button.dataset.direction = "-1";
        sliderArea.prepend(button);
      } else {
        button.dataset.direction = "+1";
        sliderArea.append(button);
      }
    });
    slider.append(sliderArea);
    slider.append(pagination);
    slideItems = slider.querySelectorAll(".slider__slide");
    return [slider, frame, slides, slideItems, buttons, trueSlidesNumber, pagination];
  }

  function createCopies() {
    const endCopies = [];
    const startCopies = [];
    let params = [0, 0, slideItems.length - 1];
    while (params[0] < slideCount * 2) {
      if (params[1] > trueSlidesNumber - 1) params[1] = 0;
      endCopies.push(slideItems[params[1]].cloneNode(true));
      if (params[2] < 0) params[2] = slideItems.length - 1;
      if (params[0] < slideCount) startCopies.push(slideItems[params[2]].cloneNode(true));
      params = [params[0] + 1, params[1] + 1, params[2] - 1];
    }
    endCopies.forEach((item) => slides.append(item));
    startCopies.forEach((item) => slides.prepend(item));
    slideItems = slider.querySelectorAll(".slider__slide");
  }

  function createBreadcrumbs() {
    const amount = Math.ceil(trueSlidesNumber / scrolledSlides);
    for (let i = 0; i < amount; i++) {
      const crumbWrap = document.createElement("div");
      const crumb = document.createElement("div");
      crumbWrap.classList.add("slider__page-wrap");
      crumb.classList.add("slider__page");
      options.breadcrumbs && options.breadcrumbs[i] ? (crumb.innerHTML = options.breadcrumbs[i]) : "";
      crumbWrap.append(crumb);
      pagination.append(crumbWrap);
    }
    return [slider.querySelectorAll(".slider__page-wrap"), slider.querySelectorAll(".slider__page")];
  }

  buttons.forEach((item) => (item.onclick = () => switchSlide(currentSlide + ~~item.dataset.direction * scrolledSlides)));
  slides.ontransitionend = afterSlide;
  frame.onpointerdown = (evt) => onMouseDown(evt);
  frame.onmousemove = (evt) => onMouseMove(evt);
  slides.ontouchmove = (evt) => onMouseMove(evt);
  frame.onpointerup = (evt) => onMouseUp(evt);
  slides.ontouchend = (evt) => onMouseUp(evt);
  frame.onmouseleave = (evt) => onMouseUp(evt);
  pages.forEach((item, index) => (item.onclick = () => switchSlide(index * scrolledSlides + slideCount)));
}

createSlider({
  slideCount: {
    1900: 4,
    1340: 3,
    840: 2,
    0: 1,
  },
  scrolledSlides: 1,
  definer: ".my-slider",
  // autoplay: {
  // time: 4000
  // },
  scrollSpeed: 0.25,
  breadcrumbs: ['<div style="color: #9aff2c">.</div>', '<div style="color: #9aff2c">.</div>', '<div style="color: #9aff2c">.</div>'],
  buttons: ["", ""],
});
