const SUPABASE_URL = "https://huueufghgmizeqfkpbgw.supabase.co";
const SUPABASE_KEY = "sb_publishable_aC933vkswRIPBZgltA0XoQ_KR5P9wdO";

let sb = null;

function loadSupabase() {
  return new Promise((resolve) => {
    if (window.supabase) return resolve();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

async function startAuth() {
  await loadSupabase();

  sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const {
    data: { session }
  } = await sb.auth.getSession();

  updateAuthUI(session);
  protectPurchases(session);

  sb.auth.onAuthStateChange((_event, newSession) => {
    updateAuthUI(newSession);
    protectPurchases(newSession);
  });
}

/* =========================
   ACCOUNT UI
========================= */

function updateAuthUI(session) {
  let box = document.getElementById("zentra-auth-box");

  if (!box) {
    box = document.createElement("div");
    box.id = "zentra-auth-box";
    document.body.appendChild(box);
  }

  if (session) {
    const user = session.user;

    const username =
      user.user_metadata?.username ||
      user.user_metadata?.game_name ||
      user.email?.split("@")[0] ||
      "Player";

    box.innerHTML = `
      <div class="zentra-account">
        <span class="account-dot"></span>
        <span class="account-name">${escapeHtml(username)}</span>
        <button id="zentra-logout">LOGOUT</button>
      </div>
    `;

    document.getElementById("zentra-logout").onclick = async () => {
      await sb.auth.signOut();
      location.reload();
    };

  } else {

    box.innerHTML = `
      <div class="zentra-account">
        <a href="login.html">LOGIN</a>
        <a href="signup.html">SIGN UP</a>
      </div>
    `;
  }
}

/* =========================
   STORE PURCHASE PROTECTION
========================= */

function protectPurchases(session) {

  document.addEventListener("click", async function(e) {

    const target = e.target.closest(
      "a, button, [role='button']"
    );

    if (!target) return;

    const text = (
      target.innerText ||
      target.textContent ||
      ""
    ).trim().toLowerCase();

    const href = (
      target.getAttribute("href") ||
      ""
    ).toLowerCase();

    const isBuyButton =
      text.includes("buy now") ||
      text === "buy" ||
      text.includes("purchase") ||
      text.includes("checkout") ||
      text.includes("add to basket") ||
      text.includes("add to cart") ||
      target.classList.contains("buy-btn") ||
      target.classList.contains("buy-now") ||
      target.classList.contains("purchase-btn") ||
      target.hasAttribute("data-buy");

    const isStorePurchaseLink =
      href.includes("tebex") ||
      href.includes("checkout") ||
      href.includes("basket") ||
      href.includes("purchase");

    if (!isBuyButton && !isStorePurchaseLink) return;

    const {
      data: { session: currentSession }
    } = await sb.auth.getSession();

    if (!currentSession) {

      e.preventDefault();
      e.stopImmediatePropagation();

      const currentPage =
        location.pathname.split("/").pop() || "store.html";

      location.href =
        "login.html?redirect=" +
        encodeURIComponent(currentPage);

      return false;
    }

  }, true);
}

/* =========================
   HTML SAFETY
========================= */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c];
  });
}

startAuth();
