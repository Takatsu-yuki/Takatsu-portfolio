"use strict";

//フェードイン
const fadeIn = document.querySelectorAll(".fade-in");

const worksListOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const worksListObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, worksListOptions);

fadeIn.forEach((list) => {
  worksListObserver.observe(list);
});

//　視差効果
var rellax = new Rellax(".rellax", {
  // center: true,
});
