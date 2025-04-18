"use strict";

//biography
const pagination = document.querySelectorAll("#pagination li");
const slideItems = document.querySelectorAll("#slide-items li");

pagination.forEach((el, index) => {
  el.addEventListener("click", () => {
    pagination.forEach((item) => {
      item.classList.remove("active");
    });
    slideItems.forEach((item) => {
      item.classList.remove("active");
    });
    el.classList.add("active");
    slideItems[index].classList.add("active");
  });
});

//slide-1 アコーディオンパネル
const initializeDetailsAccordion = (details) => {
  const summary = details.querySelector("summary");
  const panel = details.querySelector("summary + *");

  if (!(details && summary && panel)) return; // 必要要素が揃ってない場合は処理をやめる

  let isTransitioning = false; // 連打防止フラグ
  let isEnabled = true; // ←これで機能ON/OFFを切り替えます

  const onOpen = () => {
    if (details.open || isTransitioning || !isEnabled) return;
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
    if (!details.open || isTransitioning || !isEnabled) return;
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

  const clickHandler = (event) => {
    if (!isEnabled) {
      event.preventDefault(); // 無効時はクリックを無効化
      return;
    }

    event.preventDefault();
    if (details.open) {
      onClose();
    } else {
      onOpen();
    }
  };

  summary.addEventListener("click", clickHandler);

  // 機能の有効/無効を切り替える関数
  const updateMode = (enabled) => {
    isEnabled = enabled;
    if (!enabled) {
      // 無効化時：開いた状態にしておく
      details.setAttribute("open", "");
      panel.style.gridTemplateRows = "1fr";
    } else {
      // 有効化時：一旦閉じる
      details.removeAttribute("open");
      panel.style.gridTemplateRows = "";
    }
  };

  // メディアクエリで監視
  const mql = window.matchMedia("(max-width: 770px)");
  mql.addEventListener("change", (e) => {
    updateMode(!e.matches); // 770px以下なら無効に
  });

  // 初回実行時にも反映
  updateMode(!mql.matches);
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

//gsap
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
const tl = gsap.timeline();
const mm = gsap.matchMedia();
const right = document.querySelector("#yuki .right");
const rightTop = right.getBoundingClientRect().top + window.scrollY;
const offset = (window.innerHeight - 600) * 0.5;
const rightStart = rightTop - offset;
const subheads = document.querySelectorAll('[class^="subhead"]');
const bgEn = document.querySelectorAll("#yuki [class^='bg-en']");
const slide3Items = document.querySelectorAll("#yuki [class^='item-']");
const dots = document.querySelectorAll(".dots span");
const colorClass = ["blue", "green", "pink"];

// .circleの設定
mm.add("(min-width: 771px)", () => {
  gsap.to("#yuki .circle", 0.5, {
    autoAlpha: 0.3,
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
});

// .slideの設定
// pcサイズ
mm.add("(min-width: 1201px)", () => {
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
  gsap.to("#yuki .chara", {
    opacity: 0,
    duration: 0.1,

    scrollTrigger: {
      trigger: "#yuki .right",
      start: "40% center",
      end: "60% center",
      // markers: true,
      toggleActions: "play none none reverse",
      toggleClass: {
        targets: ["#yuki .item-1"],
        className: "active",
      },
    },
  });
  gsap.to("#yuki .color", {
    opacity: 1,
    duration: 0.1,

    scrollTrigger: {
      // markers: true,
      trigger: "#yuki .right",
      start: "40% center",
      end: "60% center",
      toggleActions: "play none none reverse",
    },
  });
  gsap.to("#yuki .color", {
    duration: 0.3,
    scrollTrigger: {
      // markers: true,
      trigger: "#yuki .right",
      start: "60% center",
      end: "80% center",
      toggleActions: "play none none reverse",
      toggleClass: {
        targets: ["#yuki .item-2"],
        className: "active",
      },
    },
  });
  gsap.to("#yuki .color", {
    duration: 0.3,
    scrollTrigger: {
      // markers: true,
      trigger: "#yuki .right",
      start: "60% center",
      end: "80% center",
      toggleActions: "play none none reverse",
      toggleClass: {
        targets: ["#yuki .color"],
        className: "green",
      },
    },
  });

  gsap.to("#yuki .color", {
    duration: 0.3,
    scrollTrigger: {
      // markers: true,
      trigger: "#yuki .right",
      start: "80% center",
      toggleActions: "play none none reverse",
      toggleClass: {
        targets: ["#yuki .item-3"],
        className: "active",
      },
    },
  });
  gsap.to("#yuki .color", {
    duration: 0.3,
    scrollTrigger: {
      // markers: true,
      trigger: "#yuki .right",
      start: "80% center",
      toggleActions: "play none none reverse",
      toggleClass: {
        targets: ["#yuki .color"],
        className: "pink",
      },
    },
  });
});
// tabletサイズ
mm.add("(min-width:771px) and (max-width: 1200px)", () => {
  const slide1 = document.querySelector("#yuki .slide-1");
  slide1.classList.remove("active");
  gsap.to("#yuki .chara-md", {
    opacity: 0.2,
    scrollTrigger: {
      trigger: "#yuki .right",
      start: "9% center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
  });
  gsap.to("#yuki .slide-1", {
    scrollTrigger: {
      trigger: "#yuki .right",
      start: "9% center",
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
  gsap.to("#yuki .chara-md", {
    opacity: 0,
    duration: 0.3,
    scrollTrigger: {
      toggleActions: "play none none reverse",
      trigger: "#yuki .right",
      start: "40% center",
      end: "60% center",
    },
  });
  gsap.to("#yuki .color-md", {
    opacity: 0.3,
    duration: 0.3,
    scrollTrigger: {
      toggleActions: "play none none reverse",
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
  gsap.to("#yuki .color-md", {
    scrollTrigger: {
      trigger: "#yuki .right",
      start: "60% center",
      end: "80% center",
      toggleClass: { targets: "#yuki .color-md", className: "green" },
    },
  });
  gsap.to("#yuki .item-3", {
    scrollTrigger: {
      trigger: "#yuki .right",
      start: "80% center",
      toggleClass: { targets: "#yuki .item-3", className: "active" },
    },
  });
  gsap.to("#yuki .color-md", {
    scrollTrigger: {
      trigger: "#yuki .right",
      start: "80% center",
      toggleClass: { targets: "#yuki .color-md", className: "pink" },
    },
  });
});
// spサイズ
mm.add("(max-width: 770px)", () => {
  gsap.to("#yuki .chara", {
    scrollTrigger: {
      trigger: "#yuki .right",
      start: "top bottom",
      end: "bottom top",
      toggleClass: { targets: ".chara", className: "opacity-02" },
      // markers: true,
    },
  });
  gsap.to("#yuki .chara", {
    scrollTrigger: {
      trigger: "#yuki .slide-3",
      start: "top +=172px",
      toggleClass: { targets: ".chara", className: "opacity-0" },
    },
  });
});

// .subheadの設定
// tablet以上
mm.add("(min-width: 771px)", () => {
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
});
// spサイズ
mm.add("(max-width: 770px)", () => {
  gsap.to("#yuki .subhead-1", {
    scrollTrigger: {
      endTrigger: "#yuki .slide-1",
      startTrigger: "#yuki. .subhead-1",
      start: "top bottom",
      end: "bottom +=172px",
      toggleClass: { targets: ".subhead-1", className: "active" },
    },
  });
  gsap.to("#yuki .subhead-2", {
    scrollTrigger: {
      trigger: "#yuki .slide-2",
      start: "top +=172px",
      end: "bottom +=172px",
      toggleClass: { targets: ".subhead-2", className: "active" },
    },
  });
  gsap.to("#yuki .subhead-3", {
    scrollTrigger: {
      trigger: "#yuki .slide-3",
      start: "top +=172px",
      end: "bottom +=172px",
      toggleClass: { targets: ".subhead-3", className: "active" },
    },
  });
  gsap.to("#yuki .dot-1", {
    scrollTrigger: {
      endTrigger: "#yuki .slide-1",
      startTrigger: "#yuki. dot-1",
      start: "top bottom",
      end: "bottom +=172px",
      toggleClass: { targets: ".dot-1", className: "active" },
    },
  });
  gsap.to("#yuki .dot-2", {
    scrollTrigger: {
      trigger: "#yuki .slide-2",
      start: "top +=172px",
      end: "bottom +=172px",
      toggleClass: { targets: ".dot-2", className: "active" },
    },
  });
  gsap.to("#yuki .dot-3", {
    scrollTrigger: {
      trigger: "#yuki .slide-3",
      start: "top +=172px",
      end: "bottom +=172px",
      toggleClass: { targets: ".dot-3", className: "active" },
    },
  });

  gsap.to("#yuki .head", {
    scrollTrigger: {
      trigger: "#yuki .head",
      start: "bottom +=172px",
      endTrigger: "#yuki .item-2",
      end: "bottom +=172px",
      pin: true,
      pinSpacing: false,
      // markers: true,
    },
  });
});

// .subheadをクリックした時の動き
mm.add("(min-width: 771px)", () => {
  subheads.forEach((subhead, index) => {
    subhead.addEventListener("click", function () {
      gsap.to(window, {
        duration: 0,
        scrollTo: { y: rightStart + 600 * index },
      });
    });
  });
});

// spサイズcharaの動き
mm.add("(max-width: 770px)", () => {
  gsap.to("#yuki .bg-cont", {
    scrollTrigger: {
      trigger: "#yuki .bg-cont",
      start: "top +=172px",
      endTrigger: "#yuki .item-2",
      end: "bottom +=172px",
      pin: "#yuki .bg-cont",
      pinSpacing: false,
      // markers: true,
    },
  });
  bgEn.forEach((bg, index) => {
    gsap.to(bg, {
      alpha: 1,
      duration: 0.1,
      // marker: true,
      scrollTrigger: {
        trigger: slide3Items[index],
        start: "top +=172px",
        ...(index !== 3 && { end: "bottom +=172px" }),
        toggleActions: "play reverse play reverse",
        toggleClass: { targets: "#yuki .color", className: colorClass[index] },
      },
    });
  });
});

// リロードボタンを押したらページ上部に戻るよう設定
window.addEventListener("load", () => {
  const perfEntries = performance.getEntriesByType("navigation");
  if (perfEntries.length > 0 && perfEntries[0].type === "reload") {
    // 上へスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });

    // スクロール完了を監視してからScrollTrigger.refresh()
    const checkIfAtTop = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(checkIfAtTop);
        ScrollTrigger.refresh();
      }
    }, 50);
  }
});
