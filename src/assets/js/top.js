"use strict";

//loading
// 円形のプログレスバーを作成
var bar = new ProgressBar.Circle("#loading-item", {
  strokeWidth: 1,
  color: "#FCFBF8",
  trailWidth: 0,
  easing: "easeInOut",
  duration: 1500,
  text: {
    value: "0%",
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      fontFamily: '"EB Garamond", serif',
      color: "#FCFBF8",
    },
    autoStyleContainer: false,
  },
  step: function (state, bar) {
    bar.setText(Math.round(bar.value() * 100) + " %");
  },
});

window.addEventListener("load", () => {
  // プログレスバーを100%まで進める
  bar.animate(1.0, function () {
    // オープニングアニメーション
    gsap.registerPlugin(CustomEase);
    const TL = gsap.timeline();
    const loadingScreen = document.querySelector("#loading");
    const loadingItem = document.querySelector("#loading-item");
    const openingClipItems = document.querySelectorAll(".clip-item");
    const openingBg = document.querySelector("#fv .bg");
    const openingCharacter = document.querySelector("#fv .character");

    TL.to(loadingItem, { opacity: 0, duration: 0.5, delay: 0.3 })
      .to(loadingScreen, {
        y: "-100lvh",
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(loadingScreen, {
        autoAlpha: 0,
      })
      .from(openingClipItems, {
        y: "110%",
        duration: 0.5,
      })
      .from(openingBg, {
        opacity: 0,
        x: "-40px",
        duration: 2,
        ease: CustomEase.create("custom", "0.56,0.15,.14,1.00"),
      })
      .from(
        openingCharacter,
        {
          opacity: 0,
          x: "-90px",
          duration: 2,
          ease: CustomEase.create("custom", "0.56,0.15,.14,1.00"),
        },
        "<"
      );
  });
});

//fv
const circle = document.querySelector("#fv .circle");

// ホバーの回転
circle.addEventListener("mouseenter", () => {
  circle.animate(
    {
      transform: ["rotate(0)", "rotate(60deg)"],
    },
    {
      duration: 1000,
      easing: "ease",
      fill: "forwards",
    }
  );
});

//gallery
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

//about-me
const monthItems = document.querySelectorAll(".month");
const tool = document.querySelector("#tool");
const fillItems = document.querySelectorAll(".fill");

// 数字の表示
document.addEventListener("DOMContentLoaded", () => {
  monthItems.forEach((item) => {
    const monthValue = Number(item.getAttribute("date-month"));
    item.textContent = `${monthValue}ヶ月`;
  });
});

// ステータスバーのアニメーション
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
