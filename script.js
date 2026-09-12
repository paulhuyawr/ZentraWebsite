/* =========================================
   ZENTRAMC WEBSITE SCRIPT
   ========================================= */

/* INTRO ANIMATION */

document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro");

  if (intro) {
    setTimeout(() => {
      intro.classList.add("hide");

      setTimeout(() => {
        intro.remove();
      }, 900);

    }, 2300);
  }

});


/* =========================================
   SIDEBAR
   ========================================= */

function initNavigation() {

  const menu = document.querySelector(".menu");
  const close = document.querySelector(".close");
  const overlay = document.querySelector(".overlay");
  const sidebar = document.querySelector(".sidebar");

  if (!menu || !close || !overlay || !sidebar) return;


  function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("open");

    document.body.style.overflow = "hidden";
  }


  function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");

    document.body.style.overflow = "";
  }


  menu.addEventListener("click", openMenu);

  close.addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);


  /* ESC KEY */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* CLOSE MENU WHEN LINK IS CLICKED */

  document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });

}


/* =========================================
   COPY SERVER IP
   ========================================= */

function copyIP() {

  const IP = "zentramc.loca.lol:20272";

  navigator.clipboard.writeText(IP)
    .then(() => {

      const button = document.querySelector(".copy");

      if (!button) return;

      const oldText = button.innerText;

      button.innerText = "COPIED ✓";

      setTimeout(() => {
        button.innerText = oldText;
      }, 1600);

    })
    .catch(() => {

      alert("Copy failed. Server IP: " + IP);

    });

}


/* =========================================
   PAGE LOAD ANIMATION
   ========================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});


/* =========================================
   CONTACT FORM
   ========================================= */

function sendMessage(event) {

  event.preventDefault();

  const form = event.target;

  const button = form.querySelector("button[type='submit']");

  if (!button) return;

  const oldText = button.innerText;

  button.innerText = "SENDING...";
  button.disabled = true;

  setTimeout(() => {

    button.innerText = "MESSAGE SENT ✓";

    form.reset();

    setTimeout(() => {

      button.innerText = oldText;
      button.disabled = false;

    }, 1800);

  }, 900);

}


/* =========================================
   ACTIVE NAVIGATION
   ========================================= */

function setActivePage() {

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav a").forEach(link => {

    const linkPage =
      link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

  });

}


/* =========================================
   INITIALIZE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  setActivePage();

});


/* =====================================================
   ZENTRAMC INTERACTION ENGINE
   ===================================================== */


/* SCROLL REVEAL */

const revealItems = document.querySelectorAll(
  ".mode, .vote-card, .about-box, .store-card, .contact-box"
);

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("revealed");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold:.12
  }
);

revealItems.forEach(el => {
  revealObserver.observe(el);
});


/* BUTTON RIPPLE */

document.addEventListener("click", function(e){

  const button =
    e.target.closest(".btn, .copy");

  if(!button) return;

  const ripple =
    document.createElement("span");

  const rect =
    button.getBoundingClientRect();

  const size =
    Math.max(rect.width, rect.height);

  ripple.style.position = "absolute";
  ripple.style.width = size + "px";
  ripple.style.height = size + "px";
  ripple.style.left =
    (e.clientX - rect.left - size / 2) + "px";
  ripple.style.top =
    (e.clientY - rect.top - size / 2) + "px";

  ripple.style.borderRadius = "50%";
  ripple.style.background =
    "rgba(255,255,255,.18)";
  ripple.style.transform = "scale(0)";
  ripple.style.pointerEvents = "none";
  ripple.style.animation =
    "zentraRipple .55s ease-out";

  button.style.position = "relative";
  button.style.overflow = "hidden";

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);

});


/* PAGE TRANSITION */

document.addEventListener("click", function(e){

  const link =
    e.target.closest("a");

  if(!link) return;

  const href =
    link.getAttribute("href");

  if(
    !href ||
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    link.target === "_blank"
  ) return;

  if(
    href.endsWith(".html") ||
    href === "/"
  ){

    e.preventDefault();

    document.body.classList.add(
      "page-exit"
    );

    setTimeout(() => {

      window.location.href = href;

    }, 260);

  }

});


/* DYNAMIC STYLE */

const animationStyle =
document.createElement("style");

animationStyle.textContent = `

@keyframes zentraRipple{

  to{
    transform:scale(2.8);
    opacity:0;
  }

}

.page-exit{
  animation:
    zentraPageExit .28s ease forwards;
}

@keyframes zentraPageExit{

  to{
    opacity:0;
    transform:translateY(-8px);
  }

}

.revealed{
  opacity:1;
}

`;

document.head.appendChild(animationStyle);


/* ===== ZENTRAMC TEBEX BUY SYSTEM ===== */

(function(){

  const RANKS_URL =
    "https://zentramc-store.tebex.store/category/ranks";

  const COINS_URL =
    "https://zentramc-store.tebex.store/category/coins";

  function createBuyPopup(url){

    if(document.querySelector(".zentra-buy-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "zentra-buy-overlay";

    overlay.innerHTML = `
      <div class="zentra-buy-popup">

        <div class="zentra-buy-icon">✦</div>

        <h2>Before you <span>BUY</span></h2>

        <p>
          Make sure you enter your <b>Minecraft Game Name</b>
          correctly while purchasing.
          <br><br>
          An incorrect game name may send your purchase
          to the wrong account.
        </p>

        <div class="zentra-count">5</div>

        <div class="zentra-progress">
          <div class="zentra-progress-bar"></div>
        </div>

        <button class="zentra-cancel">
          CANCEL
        </button>

      </div>
    `;

    $1

    /* AUTO CENTER BUY POPUP */
    requestAnimationFrame(() => {
      const popup = overlay.querySelector(".zentra-buy-popup");

      if (popup) {
        const rect = popup.getBoundingClientRect();
        const targetY =
          window.scrollY +
          rect.top +
          (rect.height / 2) -
          (window.innerHeight / 2);

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: "smooth"
        });
      }
    });

    /* Smoothly bring the buy popup into view */
    requestAnimationFrame(() => {
      overlay.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      overlay.classList.add("active");
    });

    const count = overlay.querySelector(".zentra-count");
    const bar = overlay.querySelector(".zentra-progress-bar");
    const cancel = overlay.querySelector(".zentra-cancel");

    let seconds = 5;

    bar.style.animation =
      "buyProgress 5s linear forwards";

    const timer = setInterval(()=>{

      seconds--;

      if(seconds > 0){
        count.textContent = seconds;
      }

      if(seconds <= 0){

        clearInterval(timer);

        window.location.href = url;
      }

    },1000);

    cancel.onclick = ()=>{
      clearInterval(timer);
      overlay.classList.remove("active");

      setTimeout(()=>{
        overlay.remove();
      },350);
    };
  }

  document.addEventListener("click", async function(e){

    const button = e.target.closest(
      ".buy-btn, .buy-now, .purchase-btn, [data-buy]"
    );

    if(!button) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    /* LOGIN CHECK */
    if(typeof sb !== "undefined" && sb){

      const {
        data:{session}
      } = await sb.auth.getSession();

      if(!session){

        window.location.href =
          "login.html?redirect=store.html";

        return;
      }
    }

    let type =
      button.dataset.buy ||
      button.dataset.category ||
      button.getAttribute("data-product") ||
      "";

    const text =
      (button.innerText || "").toLowerCase();

    let url;

    if(
      type.toLowerCase().includes("coin") ||
      text.includes("coin")
    ){
      url = COINS_URL;
    }else{
      url = RANKS_URL;
    }

    createBuyPopup(url);

  }, true);

})();

/* =========================================================
   ZENTRAMC GLOBAL BACKGROUND MUSIC
   ========================================================= */

(function () {
  const MUSIC_SRC = "assets/c418_aria_math.mp3";

  let audio = document.getElementById("zentraGlobalMusic");

  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "zentraGlobalMusic";
    audio.src = MUSIC_SRC;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;
    document.body.appendChild(audio);
  }

  function startZentraMusic() {
    audio.loop = true;
    audio.volume = 0.35;

    audio.play().catch(() => {});
  }

  /* Start when browser permits it */
  startZentraMusic();

  /* First interaction unlocks audio on mobile */
  ["click", "touchstart", "pointerdown", "keydown"].forEach(event => {
    document.addEventListener(event, startZentraMusic, {
      once: true,
      passive: true
    });
  });

  /* Keep looping if playback unexpectedly stops */
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    startZentraMusic();
  });

})();
