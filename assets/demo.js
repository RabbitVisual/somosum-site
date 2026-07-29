(() => {
  const ORDER = [
    {
      type: "Boas-vindas",
      title: "Bem-vindos ao culto",
      body: "Que a paz de Cristo encha este lugar.",
      screen: "Bem-vindos ao culto",
    },
    {
      type: "Louvor",
      title: "CC 15 · Grande é o Senhor",
      body: "Grande é o Senhor e mui digno de ser louvado…",
      screen: "Grande é o Senhor\ne mui digno de ser louvado",
      chord: "G          D          Em\nGrande é o Senhor e mui digno…",
    },
    {
      type: "Bíblia",
      title: "João 3:16",
      body: "Porque Deus amou o mundo de tal maneira…",
      screen: "João 3:16\nPorque Deus amou o mundo…",
    },
    {
      type: "Mensagem",
      title: "Palavra · Fidelidade",
      body: "Roteiro do pregador no teleponto do Stage.",
      screen: "Fidelidade de Deus",
      tele: "1. Introdução — fidelidade no cotidiano\n2. Texto — Lamentações 3:22-23\n3. Aplicação — confiança na graça",
    },
  ];

  let index = 1;
  let blank = false;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function renderOrder(root) {
    const list = $("[data-demo-order]", root);
    if (!list) return;
    list.innerHTML = ORDER.map(
      (item, i) =>
        `<button type="button" class="demo-order-item${i === index ? " is-active" : ""}" data-idx="${i}">
          <strong>${item.title}</strong>
          <small>${item.type}</small>
        </button>`
    ).join("");
    list.querySelectorAll("[data-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        index = Number(btn.dataset.idx);
        blank = false;
        paint();
      });
    });
  }

  function paint() {
    const item = ORDER[index];
    $$("[data-demo-preview-title]").forEach((el) => {
      el.textContent = blank ? "Tela preta" : item.title;
    });
    $$("[data-demo-preview-body]").forEach((el) => {
      el.textContent = blank ? "" : item.body;
    });
    $$("[data-demo-screen-title]").forEach((el) => {
      el.textContent = blank ? "" : item.title.split(" · ").pop() || item.title;
    });
    $$("[data-demo-screen-body]").forEach((el) => {
      el.textContent = blank ? "" : item.screen || item.body;
    });
    $$("[data-demo-meta]").forEach((el) => {
      el.textContent = blank ? "Overlay: blank" : `${index + 1}/${ORDER.length} · ${item.type}`;
    });
    $$("[data-demo-lyrics]").forEach((el) => {
      el.textContent = blank ? "—" : item.screen || item.body;
    });
    $$("[data-demo-chord]").forEach((el) => {
      el.textContent = blank ? "—" : item.chord || "(cifra sincronizada no louvor)";
    });
    $$("[data-demo-tele]").forEach((el) => {
      el.textContent = blank ? "—" : item.tele || "Teleponto disponível no perfil Pregador.";
    });
    $$("[data-demo-remote-now]").forEach((el) => {
      el.textContent = blank ? "Tela preta" : item.title;
    });

    document.querySelectorAll("[data-demo-root]").forEach((root) => {
      renderOrder(root);
    });
  }

  function go(delta) {
    blank = false;
    index = Math.max(0, Math.min(ORDER.length - 1, index + delta));
    paint();
  }

  document.querySelectorAll("[data-demo-prev]").forEach((btn) => {
    btn.addEventListener("click", () => go(-1));
  });
  document.querySelectorAll("[data-demo-next]").forEach((btn) => {
    btn.addEventListener("click", () => go(1));
  });
  document.querySelectorAll("[data-demo-blank]").forEach((btn) => {
    btn.addEventListener("click", () => {
      blank = !blank;
      paint();
    });
  });

  document.querySelectorAll("[data-stage-layout]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const layout = btn.dataset.stageLayout;
      const body = document.querySelector("[data-demo-stage-body]");
      const bar = btn.closest(".demo-stage-bar");
      if (bar) {
        bar.querySelectorAll("[data-stage-layout]").forEach((b) => b.classList.toggle("is-active", b === btn));
      }
      if (body) body.dataset.layout = layout;
    });
  });

  document.querySelectorAll("[data-demo-tabs]").forEach((wrap) => {
    const tabs = wrap.querySelectorAll("[data-demo-tab]");
    const panels = document.querySelectorAll(wrap.dataset.demoTabs || "[data-demo-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.dataset.demoTab;
        tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        document.querySelectorAll("[data-demo-panel]").forEach((p) => {
          p.classList.toggle("is-active", p.dataset.demoPanel === id);
        });
      });
    });
  });

  paint();
})();
