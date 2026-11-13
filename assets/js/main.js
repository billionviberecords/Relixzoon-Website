/* RelixZoon marketing site — no frameworks, no external libraries. */
(function () {
  "use strict";

  var cfg = window.RZ_CONFIG || {};
  var links = cfg.links || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function isUrl(v) { return typeof v === "string" && /^(https?:)?\/\//i.test(v.trim()); }

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Logo ---------- */
  if (cfg.logo && cfg.logo.src) {
    $$("[data-logo]").forEach(function (el) {
      var img = new Image();
      img.src = cfg.logo.src;
      img.alt = cfg.logo.alt || "RelixZoon";
      img.decoding = "async";
      img.style.setProperty("--logo-h", (cfg.logo.height || 32) + "px");
      el.replaceWith(img);
    });
  }

  /* ---------- Toast ---------- */
  var toast = $(".toast"), toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
  }

  /* ---------- Links: verified destination or "coming soon" ---------- */
  function resolve(key) {
    if (key === "getStarted") return links.app || links.artistSignup || "";
    if (key === "contact") return links.contactEmail ? "mailto:" + links.contactEmail.trim() : "";
    return links[key] || "";
  }

  $$("[data-link]").forEach(function (a) {
    var key = a.getAttribute("data-link");
    var url = resolve(key);
    if (url && (isUrl(url) || url.indexOf("mailto:") === 0)) {
      a.href = url;
      if (isUrl(url)) { a.target = "_blank"; a.rel = "noopener"; }
      return;
    }
    var fallback = a.getAttribute("data-fallback");
    if (fallback) { a.href = fallback; return; }     // e.g. scroll to the Discover section
    var soon = a.getAttribute("data-soon");
    if (soon) {
      a.classList.add("is-soon");
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("role", "button");
      a.removeAttribute("href");
      a.tabIndex = 0;
      var label = a.textContent.trim();
      a.setAttribute("aria-label", label + " (coming soon)");
      var fire = function (e) { e.preventDefault(); showToast(soon); };
      a.addEventListener("click", fire);
      a.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") fire(e); });
    }
    // otherwise it keeps its in-page href (e.g. Get Started → #join)
  });

  if (links.artistSignup) {
    var status = $("[data-signup-status]");
    if (status) status.hidden = true;
  }

  /* ---------- Social links (only real, configured accounts) ---------- */
  var icons = {
    instagram: '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3.1 0-4.1.1-3.7.2-5.6 2-5.8 5.8C2 8.9 2 9.3 2 12s0 3.1.1 4.1c.2 3.7 2 5.6 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.2 5.6-2 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.2-3.7-2-5.6-5.8-5.8C15.1 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.3-.1-4s0-3 .1-4C4 5.3 5.3 4 8 3.9c1-.1 1.3-.1 4-.1Z"/>',
    tiktok: '<path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2-2.8V9a6.2 6.2 0 1 0 5.3 6.2V8.6a7.8 7.8 0 0 0 4.4 1.4V6.7a4.5 4.5 0 0 1-4.4-4.7Z"/>',
    x: '<path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/>',
    youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.8 3-5.8 3Z"/>',
    facebook: '<path d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.5H14C10.1 1.5 9.3 4.4 9.3 6.2v2.3H7v4h2.3V22.5H14V12.5h3.2l.4-4H14Z"/>'
  };
  var names = { instagram: "Instagram", tiktok: "TikTok", x: "X", youtube: "YouTube", facebook: "Facebook" };
  var socialList = $("[data-social]");
  if (socialList && cfg.social) {
    Object.keys(icons).forEach(function (k) {
      var url = cfg.social[k];
      if (!isUrl(url)) return;
      var li = document.createElement("li");
      li.innerHTML = '<a href="' + encodeURI(url) + '" target="_blank" rel="noopener" aria-label="RelixZoon on ' + names[k] + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + icons[k] + "</svg></a>";
      socialList.appendChild(li);
    });
    if (!socialList.children.length) socialList.hidden = true;
  }

  /* ---------- Artwork slots ---------- */
  var art = cfg.artwork || {};
  $$("[data-art]").forEach(function (slot) {
    var key = slot.getAttribute("data-art");
    var a = art[key];
    if (!a || !a.src) return;
    var pic = document.createElement("picture");
    if (a.mobile) {
      var s = document.createElement("source");
      s.media = "(max-width: 700px)";
      s.srcset = a.mobile;
      pic.appendChild(s);
    }
    var img = document.createElement("img");
    img.src = a.src;
    img.alt = "";
    img.decoding = "async";
    if (key === "hero") img.setAttribute("fetchpriority", "high");
    else img.loading = "lazy";
    img.addEventListener("error", function () { pic.remove(); slot.classList.remove("has-art"); });
    pic.appendChild(img);
    slot.insertBefore(pic, slot.firstChild);
    slot.classList.add("has-art");
  });

  /* ---------- App screenshots ---------- */
  var shots = cfg.screenshots || {};
  $$("[data-shot]").forEach(function (fig) {
    var key = fig.getAttribute("data-shot");
    var screen = $(".phone__screen", fig);
    var label = $("figcaption", fig).textContent;
    if (shots[key]) {
      var img = document.createElement("img");
      img.src = shots[key];
      img.alt = "RelixZoon app — " + label + " screen";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function () { img.remove(); screen.classList.add("is-empty"); });
      screen.appendChild(img);
    } else {
      screen.classList.add("is-empty");
    }
  });

  /* ---------- Navigation ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 24); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = $(".nav__toggle"), menu = $("#mobile-menu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    nav.classList.toggle("is-scrolled", open || window.scrollY > 24);
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); } });
  window.addEventListener("resize", function () { if (window.innerWidth > 900 && !menu.hidden) setMenu(false); });

  // Active section highlight
  var navLinks = $$(".nav__links a");
  if ("IntersectionObserver" in window) {
    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id === "fans" ? "discover" : en.target.id === "app" ? "about" : en.target.id;
        navLinks.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["top", "discover", "artists", "fans", "how", "about", "app"].forEach(function (id) {
      var el = document.getElementById(id); if (el) sectionIO.observe(el);
    });

    // Gentle settle-in for section headings (content is never hidden)
    if (!reduceMotion) {
      var revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      $$("[data-reveal]").forEach(function (el) { revealIO.observe(el); });
    } else {
      $$("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
    }
  } else {
    $$("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- How it works tabs ---------- */
  var tabs = $$(".tab"), pill = $(".tabs__pill");
  function placePill(tab) {
    if (!pill || !tab) return;
    pill.style.width = tab.offsetWidth + "px";
    pill.style.transform = "translateX(" + (tab.offsetLeft - 5) + "px)";
  }
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      panel.classList.toggle("is-showing", on);
    });
    placePill(tab);
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(n, true);
      }
    });
  });
  var initPill = function () { placePill($('.tab[aria-selected="true"]')); };
  initPill();
  window.addEventListener("resize", initPill);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(initPill);

  /* ---------- Hero sound wave (canvas, paused when off-screen) ---------- */
  var canvas = $(".hero__wave");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1, bars = 0, running = false, visible = true, raf = 0, t0 = performance.now();
    var styles = getComputedStyle(document.documentElement);
    var pink = styles.getPropertyValue("--pink").trim() || "#F6057D";
    var pinkDeep = styles.getPropertyValue("--pink-deep").trim() || "#A8035A";

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bars = Math.max(28, Math.min(96, Math.round(w / 16)));
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var gap = w / bars, bw = Math.max(3, gap * 0.42), mid = h * 0.62;
      var grad = ctx.createLinearGradient(0, mid - h * 0.5, 0, mid + h * 0.3);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(0.35, pink);
      grad.addColorStop(1, pinkDeep);
      ctx.fillStyle = grad;
      for (var i = 0; i < bars; i++) {
        var x = i / bars;
        var env = Math.pow(Math.sin(Math.PI * Math.min(1, x * 1.05 + 0.02)), 0.8);
        var a = Math.sin(x * 9 + t * 1.3) * 0.5 + Math.sin(x * 23 - t * 2.1) * 0.3 + Math.sin(x * 4.3 + t * 0.7) * 0.4;
        var amp = (0.25 + Math.abs(a) * 0.75) * env;
        var up = amp * h * 0.5, down = amp * h * 0.16;
        var bx = i * gap + (gap - bw) / 2;
        ctx.globalAlpha = 0.35 + env * 0.55;
        roundRect(bx, mid - up, bw, up + down, bw / 2);
      }
      ctx.globalAlpha = 1;
    }
    function roundRect(x, y, ww, hh, r) {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r);
      else ctx.rect(x, y, ww, hh);
      ctx.fill();
    }
    function loop(now) {
      if (!running) return;
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    }
    function start() { if (running || reduceMotion || !visible || document.hidden) return; running = true; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    size();
    draw(1.2); // a still frame immediately (and the only frame with reduced motion)
    window.addEventListener("resize", function () { size(); draw((performance.now() - t0) / 1000); }, { passive: true });
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
    }
    start();
  }
})();
