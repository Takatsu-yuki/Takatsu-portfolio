"use strict";

//navigation
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#nav");
const navLinks = document.querySelectorAll("#nav a");

// ハンバーガーボタンアニメーション
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});

// navigationの非表示条件
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
  });
});

//splitText spanタグに分割
const splitText = document.querySelectorAll(".split-text");
console.log(splitText);
splitText.forEach((target) => {
  let newText = "";
  let spanText = target.innerHTML;

  spanText.split("").forEach((char) => {
    newText += "<span>" + char + "</span>";
  });
  let newTextBefore = "<div class='before' aria-hidden='true'>" + newText + "</div>";
  let newTextAfter = "<div class='after' aria-hidden='true'>" + newText + "</div>";
  let wrappedText = "<span class='text-wrap'>" + newTextBefore + newTextAfter + "</span>";
  target.innerHTML = wrappedText;
});

// contact をホバーした時の動き
const contactBtn = document.querySelector(".global-footer .contact");
if (contactBtn) {
  splitText.forEach((target) => {
    let beforeSpan = target.querySelectorAll(".before span");
    let afterSpan = target.querySelectorAll(".after span");
    console.log(beforeSpan, afterSpan);

    console.log(contactBtn);
    contactBtn.addEventListener("mouseenter", () => {
      beforeSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("hovered");
        }, index * 30);
      });
      afterSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("hovered");
        }, index * 30);
      });
    });
    contactBtn.addEventListener("mouseleave", () => {
      beforeSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.remove("hovered");
        }, index * 30);
      });
      afterSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.remove("hovered");
        }, index * 30);
      });
    });
  });
}
