"use strict";

// gallery
const galleryItems = document.querySelectorAll("#gallery-items > div > figure");

// フェードインさせる
const galleryOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, galleryOptions);

galleryItems.forEach((item) => {
  galleryObserver.observe(item);
});

// 視差効果をつける
var rellax = new Rellax(".rellax", {
  center: true,
  breakpoints: [576, 770, 1200],
});

// about-me
const monthItems = document.querySelectorAll(".month");
const tool = document.querySelector("#tool");
const fillItems = document.querySelectorAll(".fill");

document.addEventListener("DOMContentLoaded", () => {
  monthItems.forEach((item) => {
    const monthValue = Number(item.getAttribute("date-month"));
    item.textContent = `${monthValue}ヶ月`;
  });
});

const aboutMeOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const aboutMeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      monthItems.forEach((item, index) => {
        const monthValue = Number(item.getAttribute("date-month"));
        const widthPercentage = (monthValue / 12) * 100;
        fillItems[index].style.width = `${widthPercentage}%`;
        fillItems[index].style.transitionDelay = `${index * 0.4}s`;
      });
    }
  });
}, aboutMeOptions);

aboutMeObserver.observe(tool);
