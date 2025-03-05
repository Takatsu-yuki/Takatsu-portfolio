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

//accordion
const initializeDetailsAccordion = (details) => {
  const summary = details.querySelector("summary");
  const panel = details.querySelector("summary + *");

  if (!(details && summary && panel)) return;

  let isTransitioning = false;

  const onOpen = () => {
    if (details.open || isTransitioning) return;
    isTransitioning = true;
    panel.style.gridTemplateRows = "0fr";
    details.setAttribute("open", "");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.gridTemplateRows = "1fr";
      });
    });

    panel.addEventListener(
      "transitionend",
      () => {
        isTransitioning = false;
      },
      { once: true }
    );
  };

  const onClose = () => {
    if (!details.open || isTransitioning) return;
    isTransitioning = true;
    panel.style.gridTemplateRows = "0fr";

    panel.addEventListener(
      "transitionend",
      () => {
        details.removeAttribute("open");
        panel.style.gridTemplateRows = "";
        isTransitioning = false;
      },
      { once: true }
    );
  };

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    if (details.open) {
      onClose();
    } else {
      onOpen();
    }
  });
};

// すべての details に適用
document.querySelectorAll("details").forEach((details) => {
  initializeDetailsAccordion(details);
});
