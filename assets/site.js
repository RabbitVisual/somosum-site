(() => {
  const KEY = "somosum-theme";
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const systemTheme = () =>
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  const currentTheme = () =>
    document.documentElement.getAttribute("data-theme") || systemTheme();

  const paintTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch (_) {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#f4efe6" : "#0c0b09";
    if (themeBtn) {
      const next = theme === "light" ? "escuro" : "claro";
      themeBtn.setAttribute("aria-label", `Mudar para tema ${next}`);
      themeBtn.title = `Tema ${next}`;
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  };

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      paintTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach((a) => {
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      document.body.classList.remove("nav-open");
    });
  });

  if ("IntersectionObserver" in window && reveals.length && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 8, 6) * 0.04}s`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
})();
