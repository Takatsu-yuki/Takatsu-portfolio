"use strict";
//yuki takatsu
const slides = document.querySelectorAll("#yuki .slide");
const subheads = document.querySelectorAll("#yuki .subhead");

// //Observerオプション
// const yukiOptions = {
//   root: null,
//   rootMargin: `${-window.innerHeight / 2 + 300}px 0px ${-window.innerHeight / 2 + 300}px 0px`,
//   threshold: 1,
// };

// const yukiObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("active");
//     } else {
//       if (lastScrollY > window.scrollY) {
//         entry.target.classList.remove("active");
//       }
//     }
//     console.log(lastScrollY);
//   });
//   lastScrollY = window.scrollY;
// }, yukiOptions);

// //監視対象
// slides.forEach((slide) => {
//   yukiObserver.observe(slide);
// });

//slide-1 アコーディオンパネル
const initializeDetailsAccordion = (details) => {
  const summary = details.querySelector("summary");
  const panel = details.querySelector("summary + *");

  if (!(details && summary && panel)) return; // 必要要素が揃ってない場合は処理をやめる

  let isTransitioning = false; // 連打防止フラグ

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

document.querySelectorAll("details").forEach((details) => {
  initializeDetailsAccordion(details);
});

//slide-2 ステータス表示
const monthItems = document.querySelectorAll(".month");
const fillItems = document.querySelectorAll(".fill");

document.addEventListener("DOMContentLoaded", () => {
  monthItems.forEach((item, index) => {
    const monthValue = Number(item.getAttribute("date-month"));
    const widthPercentage = (monthValue / 12) * 100;
    item.textContent = `${monthValue}ヶ月`;
    fillItems[index].style.width = `${widthPercentage}%`;
  });
});

//gsap練習
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

console.log(gsap);
const titleEl = document.querySelector("#h1"),
  titleTexts = titleEl.textContent.split("");

titleEl.textContent = "";
let outputTexts = "";
titleTexts.forEach((text) => {
  outputTexts += text === " " ? " " : `<span>${text}</span>`;
});
titleEl.innerHTML = outputTexts;

const target = "#h1 span";

document.querySelectorAll(target).forEach((el) => {
  gsap.set(el, {
    opacity: 0,
    rotation: 90,
  });
});

const tl = gsap.timeline();

//.circleの設定
gsap.to("#yuki .circle", 0.5, {
  opacity: 0.5,
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "298px center",
    end: "bottom center",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});

gsap.to("#yuki .circle", {
  rotation: -260,
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "top center",
    end: "bottom+=300px center",
    toggleActions: "play none none reverse",
    scrub: 2,
  },
});

//.slideの設定
gsap.to("#yuki .slide-1", {
  scrollTrigger: {
    trigger: "#yuki .right",
    end: "20% center",
    toggleClass: { targets: "#yuki .slide-1", className: "active" },
  },
});
gsap.to("#yuki .slide-2", {
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "20% center",
    end: "40% center",
    toggleClass: { targets: "#yuki .slide-2", className: "active" },
  },
});
gsap.to("#yuki .item-1", {
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "40% center",
    end: "60% center",
    toggleClass: { targets: "#yuki .item-1", className: "active" },
  },
});
gsap.to("#yuki .item-2", {
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "60% center",
    end: "80% center",
    toggleClass: { targets: "#yuki .item-2", className: "active" },
  },
});
gsap.to("#yuki .item-3", {
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "80% center",
    toggleClass: { targets: "#yuki .item-3", className: "active" },
  },
});

//.subheadの設定
gsap.to("#yuki .subhead-1", {
  scrollTrigger: {
    trigger: "#yuki .right",
    end: "20% center",
    toggleClass: { targets: "#yuki .subhead-1", className: "active" },
  },
});
gsap.to("#yuki .subhead-2", {
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "20% center",
    end: "40% center",
    toggleClass: { targets: "#yuki .subhead-2", className: "active" },
  },
});
gsap.to("#yuki .subhead-3", {
  scrollTrigger: {
    trigger: "#yuki .right",
    start: "40% center",
    toggleClass: { targets: "#yuki .subhead-3", className: "active" },
  },
});

//.subheadをクリックした時の動き

const right = document.querySelector("#yuki .right");
const rightTop = right.getBoundingClientRect().top + window.scrollY;
const offset = (window.innerHeight - 600) * 0.5;
const rightStart = rightTop - offset;

console.log(rightTop);

document.querySelector("#yuki .subhead-1").addEventListener("click", function () {
  gsap.to(window, {
    duration: 0,
    scrollTo: { y: rightStart },
  });
});
document.querySelector("#yuki .subhead-2").addEventListener("click", function () {
  gsap.to(window, {
    duration: 0,
    scrollTo: { y: rightStart + 600 },
  });
});
document.querySelector("#yuki .subhead-3").addEventListener("click", function () {
  gsap.to(window, {
    duration: 0,
    scrollTo: { y: rightStart + 1200 },
  });
});
