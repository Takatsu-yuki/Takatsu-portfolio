"use strict";

//works-list
const worksLists = document.querySelectorAll("#works-cont li");

const worksListOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

const worksListObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, worksListOptions);

worksLists.forEach((list) => {
  worksListObserver.observe(list);
});
