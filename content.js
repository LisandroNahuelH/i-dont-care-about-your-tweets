(() => {
  const GLOBAL_KEY = "__ICAYT_EXTENSION__";
  const STYLE_ID = "icayt-style";
  const HOST_ATTR = "data-icayt-controls";
  const META_ROW_ATTR = "data-icayt-meta-row";
  const BUTTON_ATTR = "data-icayt-action";
  const MENU_TIMEOUT_MS = 2500;
  const DIALOG_TIMEOUT_MS = 2500;
  const OPEN_RETRY_DELAY_MS = 60;

  if (window[GLOBAL_KEY] && typeof window[GLOBAL_KEY].destroy === "function") {
    window[GLOBAL_KEY].destroy();
  }

  const ACTIONS = {
    mute: {
      label: "Silenciar cuenta",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9.5v5h3.75l4.75 4.25V5.25L8.75 9.5H5Z"></path><path d="M16.5 9.5l4 5"></path><path d="M20.5 9.5l-4 5"></path></svg>',
      matches(text) {
        return (
          includesAny(text, ["mute", "silenciar"]) &&
          !includesAny(text, ["conversation", "conversacion", "thread", "hilo"])
        );
      }
    },
    block: {
      label: "Bloquear cuenta",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M7 17L17 7"></path></svg>',
      matches(text) {
        return (
          includesAny(text, ["block", "bloquear"]) &&
          !includesAny(text, ["message", "messages", "mensaje", "mensajes"])
        );
      }
    },
    notInterested: {
      label: "No me interesa este post",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"></path><path d="M9.25 9.25a3.9 3.9 0 0 0 5.5 5.5"></path><path d="M4.5 4.5l15 15"></path></svg>',
      matches(text) {
        return (
          includesAny(text, [
            "not interested in this post",
            "not interested in this ad",
            "not interested",
            "show less often",
            "show fewer posts",
            "no me interesa este post",
            "no me interesa esta publicacion",
            "no me interesa",
            "mostrar con menor frecuencia",
            "mostrar menos seguido",
            "ver menos seguido"
          ]) &&
          !includesAny(text, ["topic", "tema"])
        );
      }
    }
  };

  const state = {
    disposed: false,
    observer: null,
    scanQueued: false,
    originalPushState: history.pushState.bind(history),
    originalReplaceState: history.replaceState.bind(history),
    busyArticles: new WeakSet(),
    onNavigationChange: null
  };

  function normalizeText(value) {
    return (value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function includesAny(text, fragments) {
    return fragments.some((fragment) => text.includes(fragment));
  }

  function isVisible(element) {
    if (!(element instanceof Element)) {
      return false;
    }

    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
  }

  function waitFor(getter, timeoutMs) {
    return new Promise((resolve) => {
      const startedAt = Date.now();

      function check() {
        if (state.disposed) {
          resolve(null);
          return;
        }

        const result = getter();
        if (result) {
          resolve(result);
          return;
        }

        if (Date.now() - startedAt >= timeoutMs) {
          resolve(null);
          return;
        }

        window.setTimeout(check, 50);
      }

      check();
    });
  }

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      [${META_ROW_ATTR}="1"] {
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
        min-width: 0;
        vertical-align: middle;
      }

      [${HOST_ATTR}="1"] {
        display: inline-flex;
        align-items: center;
        align-self: center;
        gap: 1px;
        margin-inline-start: 3px;
        margin-inline-end: 0;
        flex: 0 0 auto;
        line-height: 1;
        font-size: 0;
        vertical-align: middle;
      }

      [${HOST_ATTR}="1"] .icayt-button {
        appearance: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        border: 0;
        border-radius: 9999px;
        background: transparent;
        color: rgb(113, 118, 123);
        cursor: pointer;
        transition: background-color 120ms ease, color 120ms ease, opacity 120ms ease;
      }

      [${HOST_ATTR}="1"] .icayt-button:hover {
        background: rgba(113, 118, 123, 0.12);
        color: rgb(83, 100, 113);
      }

      [${HOST_ATTR}="1"] .icayt-button:focus-visible {
        outline: 2px solid rgba(29, 155, 240, 0.55);
        outline-offset: 1px;
      }

      [${HOST_ATTR}="1"] .icayt-button[disabled] {
        opacity: 0.45;
        cursor: progress;
      }

      [${HOST_ATTR}="1"] .icayt-button svg {
        width: 22px;
        height: 22px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: none;
      }
    `;

    document.documentElement.append(style);
  }

  function findTimeLink(article) {
    const time = article.querySelector("time");
    return time ? time.closest("a") : null;
  }

  function getCandidates(article, selector) {
    return Array.from(article.querySelectorAll(selector)).filter(
      (element) => !element.closest(`[${HOST_ATTR}="1"]`) && isVisible(element)
    );
  }

  function findPostMenuButton(article) {
    const candidates = [
      ...getCandidates(article, 'button[data-testid="caret"]'),
      ...getCandidates(article, 'div[role="button"][data-testid="caret"]'),
      ...getCandidates(article, 'button[aria-label*="More"]'),
      ...getCandidates(article, 'button[aria-label*="Más"]'),
      ...getCandidates(article, 'button[aria-label*="Mas"]'),
      ...getCandidates(article, 'div[role="button"][aria-label*="More"]'),
      ...getCandidates(article, 'div[role="button"][aria-label*="Más"]'),
      ...getCandidates(article, 'div[role="button"][aria-label*="Mas"]'),
      ...getCandidates(article, 'button[aria-haspopup="menu"]'),
      ...getCandidates(article, 'div[role="button"][aria-haspopup="menu"]')
    ];

    if (candidates.length === 0) {
      return null;
    }

    return candidates.sort((left, right) => scoreMenuButton(right) - scoreMenuButton(left))[0];
  }

  function scoreMenuButton(element) {
    let score = 0;
    const dataTestId = element.getAttribute("data-testid") || "";
    const ariaLabel = normalizeText(element.getAttribute("aria-label"));

    if (dataTestId === "caret") {
      score += 100;
    }

    if (ariaLabel.includes("more") || ariaLabel.includes("mas")) {
      score += 40;
    }

    if (element.getAttribute("aria-haspopup") === "menu") {
      score += 20;
    }

    return score;
  }

  function findInsertionPoint(article) {
    const timeLink = findTimeLink(article);
    const menuButton = findPostMenuButton(article);

    if (!timeLink || !menuButton) {
      return null;
    }

    if (timeLink.parentElement) {
      return { parent: timeLink.parentElement, anchorNode: timeLink };
    }

    if (menuButton.parentElement) {
      return { parent: menuButton.parentElement, anchorNode: null };
    }

    return null;
  }

  function getInsertionReferenceNode(parent, anchorNode, existing) {
    if (!anchorNode) {
      return existing && existing.parentElement === parent ? existing.nextSibling : parent.firstChild;
    }

    let referenceNode = anchorNode.nextSibling;

    while (referenceNode && referenceNode === existing) {
      referenceNode = referenceNode.nextSibling;
    }

    return referenceNode;
  }

  function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function createButton(article, actionKey) {
    const action = ACTIONS[actionKey];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "icayt-button";
    button.setAttribute(BUTTON_ATTR, actionKey);
    button.setAttribute("aria-label", action.label);
    button.title = action.label;
    button.innerHTML = action.icon;

    ["pointerdown", "mousedown"].forEach((eventName) => {
      button.addEventListener(
        eventName,
        (event) => {
          stopEvent(event);
        },
        true
      );
    });

    button.addEventListener("click", (event) => {
      stopEvent(event);
      void runAction(article, actionKey);
    });

    return button;
  }

  function createControls(article) {
    const host = document.createElement("div");
    host.setAttribute(HOST_ATTR, "1");

    host.append(
      createButton(article, "mute"),
      createButton(article, "block"),
      createButton(article, "notInterested")
    );

    return host;
  }

  function ensureControls(article) {
    const insertionPoint = findInsertionPoint(article);
    if (!insertionPoint) {
      return;
    }

    insertionPoint.parent.setAttribute(META_ROW_ATTR, "1");

    const existing = article.querySelector(`[${HOST_ATTR}="1"]`);
    const referenceNode = getInsertionReferenceNode(
      insertionPoint.parent,
      insertionPoint.anchorNode,
      existing
    );

    if (existing) {
      if (existing.parentElement === insertionPoint.parent && existing.previousSibling === insertionPoint.anchorNode) {
        return;
      }

      existing.remove();
    }

    const controls = createControls(article);
    insertionPoint.parent.insertBefore(controls, referenceNode);
  }

  function findVisibleMenus() {
    const roots = new Set();

    document.querySelectorAll('[role="menu"], [data-testid="Dropdown"]').forEach((element) => {
      if (!isVisible(element)) {
        return;
      }

      if (getMenuItems(element).length === 0) {
        return;
      }

      roots.add(element);
    });

    return Array.from(roots);
  }

  function getMenuItems(root) {
    const selector = [
      '[role="menuitem"]',
      'div[role="button"]',
      "button",
      'a[role="link"]'
    ].join(", ");

    return Array.from(root.querySelectorAll(selector)).filter((element) => {
      const text = normalizeText(element.textContent || element.getAttribute("aria-label"));
      return text && isVisible(element);
    });
  }

  function dismissTransientUi() {
    ["keydown", "keyup"].forEach((type) => {
      document.dispatchEvent(
        new KeyboardEvent(type, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          which: 27,
          bubbles: true,
          cancelable: true
        })
      );
    });
  }

  async function openArticleMenu(article) {
    const menuButton = findPostMenuButton(article);
    if (!menuButton) {
      return null;
    }

    dismissTransientUi();
    await sleep(OPEN_RETRY_DELAY_MS);

    const existingMenus = findVisibleMenus();
    menuButton.click();

    return waitFor(() => {
      const menus = findVisibleMenus();
      const freshMenu = menus.find((menu) => !existingMenus.includes(menu));
      return freshMenu || menus[menus.length - 1] || null;
    }, MENU_TIMEOUT_MS);
  }

  function findActionMenuItem(menuRoot, actionKey) {
    const action = ACTIONS[actionKey];
    const items = getMenuItems(menuRoot);

    return (
      items.find((element) => {
        const text = normalizeText(element.textContent || element.getAttribute("aria-label"));
        return action.matches(text);
      }) || null
    );
  }

  function findVisibleDialog() {
    const dialogs = Array.from(document.querySelectorAll('[role="dialog"]')).filter(isVisible);
    return dialogs[dialogs.length - 1] || null;
  }

  async function confirmBlockIfNeeded() {
    const dialog = await waitFor(findVisibleDialog, DIALOG_TIMEOUT_MS);
    if (!dialog) {
      return false;
    }

    const buttons = Array.from(dialog.querySelectorAll("button, div[role='button']")).filter(isVisible);
    const confirmButton =
      buttons.find((element) => {
        const text = normalizeText(element.textContent || element.getAttribute("aria-label"));
        return includesAny(text, ["block", "bloquear"]) && !includesAny(text, ["cancel", "cancelar"]);
      }) || null;

    if (!confirmButton) {
      return false;
    }

    confirmButton.click();
    return true;
  }

  function setArticleBusy(article, busy) {
    const controls = article.querySelector(`[${HOST_ATTR}="1"]`);
    if (!controls) {
      return;
    }

    controls.querySelectorAll("button").forEach((button) => {
      button.disabled = busy;
    });
  }

  async function runAction(article, actionKey) {
    if (state.busyArticles.has(article)) {
      return;
    }

    state.busyArticles.add(article);
    setArticleBusy(article, true);

    try {
      const menuRoot = await openArticleMenu(article);
      if (!menuRoot) {
        console.warn("[ICAYT] No se pudo abrir el menu del post.");
        return;
      }

      const actionItem = await waitFor(() => findActionMenuItem(menuRoot, actionKey), 400);
      if (!actionItem) {
        console.info(`[ICAYT] La accion "${ACTIONS[actionKey].label}" no esta disponible en este post.`);
        dismissTransientUi();
        return;
      }

      actionItem.click();

      if (actionKey === "block") {
        await confirmBlockIfNeeded();
      }
    } catch (error) {
      console.warn("[ICAYT] Fallo al ejecutar la accion.", error);
    } finally {
      state.busyArticles.delete(article);
      setArticleBusy(article, false);
    }
  }

  function scan() {
    if (state.disposed) {
      return;
    }

    ensureStyles();

    document.querySelectorAll("article").forEach((article) => {
      ensureControls(article);
    });
  }

  function queueScan() {
    if (state.disposed || state.scanQueued) {
      return;
    }

    state.scanQueued = true;
    window.requestAnimationFrame(() => {
      state.scanQueued = false;
      scan();
    });
  }

  function destroy() {
    if (state.disposed) {
      return;
    }

    state.disposed = true;
    state.observer?.disconnect();

    if (state.onNavigationChange) {
      window.removeEventListener("popstate", state.onNavigationChange);
      window.removeEventListener("hashchange", state.onNavigationChange);
    }

    history.pushState = state.originalPushState;
    history.replaceState = state.originalReplaceState;

    document.querySelectorAll(`[${HOST_ATTR}="1"]`).forEach((element) => {
      element.remove();
    });

    document.querySelectorAll(`[${META_ROW_ATTR}="1"]`).forEach((element) => {
      element.removeAttribute(META_ROW_ATTR);
    });

    document.getElementById(STYLE_ID)?.remove();

    if (window[GLOBAL_KEY] && window[GLOBAL_KEY].destroy === destroy) {
      delete window[GLOBAL_KEY];
    }
  }

  history.pushState = function pushState(...args) {
    const result = state.originalPushState(...args);
    queueScan();
    return result;
  };

  history.replaceState = function replaceState(...args) {
    const result = state.originalReplaceState(...args);
    queueScan();
    return result;
  };

  state.onNavigationChange = () => queueScan();
  window.addEventListener("popstate", state.onNavigationChange);
  window.addEventListener("hashchange", state.onNavigationChange);

  state.observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
        queueScan();
        return;
      }
    }
  });

  state.observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window[GLOBAL_KEY] = { destroy };
  queueScan();
})();
