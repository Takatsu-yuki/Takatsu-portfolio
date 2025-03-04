"use strict";

//yuki takatsu
const slides = document.querySelectorAll('#yuki [class^="slide-"]');
const subheads = document.querySelectorAll("#yuki .subhead");
let lastScrollY = 0;

//Observerオプション
const yukiOptions = {
  root: null,
  rootMargin: `${-window.innerHeight / 2 + 300}px 0px ${-window.innerHeight / 2 + 300}px 0px`,
  threshold: 1,
};

const yukiObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      if (lastScrollY > window.scrollY) {
        entry.target.classList.remove("active");
      }
    }
    console.log(lastScrollY);
  });
  lastScrollY = window.scrollY;
}, yukiOptions);

//監視対象
slides.forEach((slide) => {
  yukiObserver.observe(slide);
});
