"use strict";

// セクションギャラリーの動き
const galleryItems = document.querySelectorAll("#gallery-items > div > figure");

// フェードインさせる
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, options);

galleryItems.forEach((galleryItem) => {
  observer.observe(galleryItem);
});

// 視差効果をつける
var rellax = new Rellax(".rellax");
