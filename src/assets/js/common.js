"use strict";

//navigation
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#nav");
const navLinks = document.querySelectorAll("#nav a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
  });
});
