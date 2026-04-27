document.documentElement.classList.add("js");

const pageMap = {
  "": "home",
  "index.html": "home",
  "index-ka.html": "home",
  "services.html": "services",
  "services-ka.html": "services",
  "portfolio.html": "portfolio",
  "portfolio-ka.html": "portfolio",
  "about.html": "about",
  "about-ka.html": "about",
  "contact.html": "contact",
  "contact-ka.html": "contact"
};


const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const currentPage = pageMap[window.location.pathname.split("/").pop()] || "home";
const currentLang = document.documentElement.lang.startsWith("ka") ? "ka" : "en";
const siteConfig = window.TGSiteConfig || {};
const contactConfig = siteConfig.contact || {};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return map[char];
  });

const escapeHtmlWithLineBreaks = (value) =>
  escapeHtml(value).replace(/\r?\n/g, "<br>");

const isDialogBackdropClick = (dialog, event) => {
  const rect = dialog.getBoundingClientRect();

  return !(
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
};

const resolvePromoAction = (action) => {
  if (!action) return null;

  if (action.type === "whatsapp") {
    const whatsappNumber = contactConfig.whatsappNumber || "995597199500";
    const message = action.message ? `?text=${encodeURIComponent(action.message)}` : "";

    return {
      href: `https://wa.me/${whatsappNumber}${message}`,
      target: "_blank",
      rel: "noopener noreferrer"
    };
  }

  const href = action.href || "#";
  const isExternal = /^https?:\/\//i.test(href);

  return {
    href,
    target: action.newTab || isExternal ? "_blank" : "",
    rel: isExternal ? "noopener noreferrer" : ""
  };
};

const promoPopupConfig = siteConfig.promoPopup;

if (promoPopupConfig?.enabled) {
  const showOnPages = promoPopupConfig.showOnPages;
  const pageAllowed = !Array.isArray(showOnPages) || !showOnPages.length || showOnPages.includes(currentPage);
  const content = promoPopupConfig.content?.[currentLang] || promoPopupConfig.content?.en;
  const storageKey = promoPopupConfig.storageKey || "tgs-promo-popup";
  const version = promoPopupConfig.version || "default";

  const hasActiveDismissPreference = () => {
    try {
      const storedValue = localStorage.getItem(storageKey);
      if (!storedValue) return false;

      const parsedValue = JSON.parse(storedValue);
      if (parsedValue.version !== version) return false;
      if (Number(parsedValue.dismissedUntil) > Date.now()) return true;

      localStorage.removeItem(storageKey);
      return false;
    } catch (error) {
      console.warn("Promo popup preference could not be read.", error);
      return false;
    }
  };

  if (pageAllowed && content && !hasActiveDismissPreference()) {
    const pointsMarkup = Array.isArray(content.points) && content.points.length
      ? `
          <ul class="promo-popup-points">
            ${content.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
          </ul>
        `
      : "";

    const buildActionMarkup = (action, tone) => {
      const resolvedAction = resolvePromoAction(action);
      if (!resolvedAction) return "";

      const targetAttr = resolvedAction.target ? ` target="${resolvedAction.target}"` : "";
      const relAttr = resolvedAction.rel ? ` rel="${resolvedAction.rel}"` : "";

      return `
        <a class="button promo-popup-button promo-popup-button-${tone}" href="${escapeHtml(resolvedAction.href)}"${targetAttr}${relAttr} data-promo-action>
          ${escapeHtml(action.label)}
        </a>
      `;
    };

    const promoPopup = document.createElement("dialog");
    promoPopup.className = "promo-popup";
    promoPopup.setAttribute("aria-labelledby", "promo-popup-title");
    promoPopup.setAttribute("aria-describedby", "promo-popup-description");
    promoPopup.innerHTML = `
      <div class="promo-popup-card">
        <button class="promo-popup-close" type="button" aria-label="${currentLang === "ka" ? "ფანჯრის დახურვა" : "Close offer popup"}" data-promo-close>
          <span aria-hidden="true">&times;</span>
        </button>
        <span class="promo-popup-glow promo-popup-glow-a" aria-hidden="true"></span>
        <span class="promo-popup-glow promo-popup-glow-b" aria-hidden="true"></span>
        <span class="promo-popup-glow promo-popup-glow-c" aria-hidden="true"></span>
        <div class="promo-popup-inner">
          <span class="promo-popup-eyebrow">${escapeHtml(content.eyebrow || "")}</span>
          <h2 class="promo-popup-title" id="promo-popup-title">
            <span class="promo-popup-title-top">${escapeHtml(content.titleTop || "")}</span>
            <span class="promo-popup-title-main">${escapeHtmlWithLineBreaks(content.titleMain || "")}</span>
          </h2>
          <p class="promo-popup-description" id="promo-popup-description">${escapeHtml(content.description || "")}</p>
          ${pointsMarkup}
          <div class="promo-popup-actions">
            ${buildActionMarkup(content.primaryCta, "primary")}
            ${buildActionMarkup(content.secondaryCta, "secondary")}
          </div>
          <label class="promo-popup-optout">
            <input type="checkbox" data-promo-optout>
            <span>${escapeHtml(content.optOutLabel || "")}</span>
          </label>
        </div>
      </div>
    `;

    document.body.appendChild(promoPopup);

    const closeButton = promoPopup.querySelector("[data-promo-close]");
    const optOutCheckbox = promoPopup.querySelector("[data-promo-optout]");
    const hideForDays = Number(promoPopupConfig.hideForDays) || 14;
    const hideDurationMs = hideForDays * 24 * 60 * 60 * 1000;

    const persistDismissPreference = (reason) => {
      if (!optOutCheckbox?.checked) return;

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            version,
            reason,
            dismissedUntil: Date.now() + hideDurationMs
          })
        );
      } catch (error) {
        console.warn("Promo popup preference could not be stored.", error);
      }
    };

    const closePromoPopup = (reason) => {
      persistDismissPreference(reason);

      if (typeof promoPopup.close === "function" && promoPopup.open) {
        promoPopup.close();
      } else {
        promoPopup.removeAttribute("open");
        document.body.classList.remove("promo-popup-open");
        promoPopup.remove();
      }
    };

    closeButton?.addEventListener("click", () => closePromoPopup("close-button"));

    promoPopup.querySelectorAll("[data-promo-action]").forEach((link) => {
      link.addEventListener("click", () => persistDismissPreference("cta"));
    });

    promoPopup.addEventListener("click", (event) => {
      if (isDialogBackdropClick(promoPopup, event)) {
        closePromoPopup("backdrop");
      }
    });

    promoPopup.addEventListener("cancel", (event) => {
      event.preventDefault();
      closePromoPopup("escape");
    });

    promoPopup.addEventListener("close", () => {
      document.body.classList.remove("promo-popup-open");
      promoPopup.remove();
    });

    window.setTimeout(() => {
      if (!promoPopup.isConnected) return;

      if (typeof promoPopup.showModal === "function") {
        promoPopup.showModal();
      } else {
        promoPopup.setAttribute("open", "");
        document.body.classList.add("promo-popup-open");
      }

      closeButton?.focus();
    }, Math.max(0, Number(promoPopupConfig.delayMs) || 0));
  }
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("is-active");
  }
});

if (navToggle && siteNav) {
  const closeNav = () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.classList.contains("is-open")) return;
    if (siteNav.contains(event.target) || navToggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });
}

const syncHeaderState = () => {
  if (siteHeader) {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 10);
  }
};

window.addEventListener("scroll", syncHeaderState, { passive: true });
syncHeaderState();

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealNodes.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card[data-categories]");
const filterCount = document.querySelector("[data-filter-count]");

if (filterButtons.length && projectCards.length) {
  const updateFilterCount = () => {
    if (!filterCount) return;
    const visibleCount = Array.from(projectCards).filter((card) => !card.classList.contains("is-hidden")).length;
    filterCount.textContent =
      currentLang === "ka"
        ? `${visibleCount} პროექტი ჩანს`
        : `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      projectCards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(" ");
        card.classList.toggle("is-hidden", !(filter === "all" || categories.includes(filter)));
      });

      updateFilterCount();
    });
  });

  updateFilterCount();
}


const contactForms = Array.from(document.querySelectorAll("[data-contact-form]"));

if (contactForms.length) {
  const contactForm = contactForms[0];
  const successBanner = contactForm.querySelector("[data-form-success]");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const endpoint = contactForm.getAttribute("action") || "/api/contact";
  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return map[char];
    });
  const trimValue = (value) => (value || "").toString().trim();
  const uiCopy = {
    en: {
      submitting: "Sending...",
      successTitle: "Your request was sent.",
      successText: (name, business) =>
        `${name}, your details for ${business} were stored securely. We will reply within one business day.`,
      errorTitle: "The secure form endpoint is not available yet.",
      errorText:
        "Your message could not be stored from this page right now. Use WhatsApp or email below while the secure form endpoint is being connected.",
      whatsappLabel: "Open WhatsApp draft",
      emailLabel: "Open email draft"
    },
    ka: {
      submitting: "იტვირთება...",
      successTitle: "თქვენი მოთხოვნა გაიგზავნა.",
      successText: (name, business) =>
        `${name}, ${business}-ისთვის გამოგზავნილი დეტალები უსაფრთხოდ შეინახა. ერთ სამუშაო დღეში დაგიკავშირდებით.`,
      errorTitle: "უსაფრთხო ფორმის მისამართი ჯერ სრულად არ არის დაკავშირებული.",
      errorText:
        "ამ გვერდიდან თქვენი შეტყობინების შენახვა ახლა ვერ მოხერხდა. სანამ ფორმის საცავი საბოლოოდ დაერთვება, გამოიყენეთ WhatsApp ან email ქვემოთ.",
      whatsappLabel: "გახსენით WhatsApp-ის მონახაზი",
      emailLabel: "გახსენით email-ის მონახაზი"
    }
  };
  const copy = uiCopy[currentLang] || uiCopy.en;
  const setButtonLabel = (label) => {
    if (!submitButton) return;

    const labelNode = submitButton.querySelector(".dynamic-button-label");

    if (labelNode) {
      labelNode.textContent = label;
      return;
    }

    submitButton.textContent = label;
  };
  const showBanner = (tone, title, message, extraMarkup = "") => {
    if (!successBanner) return;

    successBanner.classList.add("is-visible");
    successBanner.classList.toggle("is-error", tone === "error");
    successBanner.innerHTML = `
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(message)}</p>
      ${extraMarkup}
    `;
  };
  const setSubmittingState = (isSubmitting) => {
    if (!submitButton) return;

    if (!submitButton.dataset.defaultLabel) {
      submitButton.dataset.defaultLabel = submitButton.textContent.trim();
    }

    submitButton.disabled = isSubmitting;
    setButtonLabel(isSubmitting ? copy.submitting : submitButton.dataset.defaultLabel);

    if (isSubmitting && successBanner) {
      successBanner.classList.remove("is-visible", "is-error");
      successBanner.innerHTML = "";
    }
  };

  const buildFallbackLinks = ({ name, business, contact, service, message }) => {
    const safeName = name || "there";
    const safeBusiness = business || "your business";
    const safeService = service || (currentLang === "ka" ? "არ არის მითითებული" : "Not specified");

    const emailSubject =
      currentLang === "ka"
        ? `ახალი მოთხოვნა - ${safeBusiness}`
        : `New project inquiry - ${safeBusiness}`;

    const emailBody =
      currentLang === "ka"
        ? [
            `სახელი: ${safeName}`,
            `ბიზნესი: ${safeBusiness}`,
            `კონტაქტი: ${contact}`,
            `სერვისი: ${safeService}`,
            "",
            "მესიჯი:",
            message
          ].join("\n")
        : [
            `Name: ${safeName}`,
            `Business: ${safeBusiness}`,
            `Contact: ${contact}`,
            `Service: ${safeService}`,
            "",
            "Message:",
            message
          ].join("\n");

    const whatsappText =
      currentLang === "ka"
        ? [
            `გამარჯობა, მე ვარ ${safeName}.`,
            `ბიზნესი: ${safeBusiness}`,
            `კონტაქტი: ${contact}`,
            `სერვისი: ${safeService}`,
            "",
            message
          ].join("\n")
        : [
            `Hello, my name is ${safeName}.`,
            `Business: ${safeBusiness}`,
            `Contact: ${contact}`,
            `Service needed: ${safeService}`,
            "",
            message
          ].join("\n");

    return {
      emailHref: `mailto:tbilisigrowthstudio@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
      whatsappHref: `https://wa.me/995597199500?text=${encodeURIComponent(whatsappText)}`
    };
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    void (async () => {
      const data = new FormData(contactForm);
      const combinedName = [trimValue(data.get("fname")), trimValue(data.get("lname"))].filter(Boolean).join(" ");
      const payload = {
        name: trimValue(data.get("name")) || combinedName,
        business: trimValue(data.get("business")) || trimValue(data.get("company")) || "Website inquiry",
        contact: trimValue(data.get("contact")) || trimValue(data.get("phone")) || trimValue(data.get("email")),
        service: trimValue(data.get("service")) || trimValue(data.get("growth-prompt")),
        message: trimValue(data.get("message")) || trimValue(data.get("notes")),
        website: trimValue(data.get("website")),
        page: trimValue(data.get("page")) || window.location.pathname.split("/").pop() || "contact.html",
        language: trimValue(data.get("language")) || currentLang
      };

      if (!payload.name || !payload.contact) {
        contactForm.reportValidity();
        return;
      }

      if (!payload.message) {
        payload.message = payload.service || "General website inquiry";
      }

      setSubmittingState(true);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });

        let result = null;
        const responseType = response.headers.get("content-type") || "";
        if (responseType.includes("application/json")) {
          result = await response.json();
        }

        if (!response.ok || (result && result.ok === false)) {
          throw new Error((result && result.error) || `Request failed with status ${response.status}`);
        }

        showBanner("success", copy.successTitle, copy.successText(payload.name, payload.business));
        contactForm.reset();
      } catch (error) {
        console.error(error);
        const fallbackLinks = buildFallbackLinks(payload);
        showBanner(
          "error",
          copy.errorTitle,
          copy.errorText,
          `
            <div class="success-actions">
              <a class="button button-primary" href="${fallbackLinks.whatsappHref}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.whatsappLabel)}</a>
              <a class="button button-secondary" href="${fallbackLinks.emailHref}">${escapeHtml(copy.emailLabel)}</a>
            </div>
          `
        );
      } finally {
        setSubmittingState(false);
      }
    })();
  });
}

// --- Custom Ghost Cursor Animation ---
(function initGhostCursor() {
  // Only init on non-touch devices to avoid weird mobile behavior
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const ghost = document.createElement("div");
  ghost.className = "ghost-cursor";
  
  // Custom SVG matching a typical pointer, filled black with white stroke to remain highly visible
  ghost.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#000000" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M4 4l7.07 16.97 2.51-7.39 7.39-2.51L4 4z"/></svg>';
  
  document.body.appendChild(ghost);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ghostX = mouseX;
  let ghostY = mouseY;
  
  let isClicking = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener("mousedown", () => isClicking = true);
  window.addEventListener("mouseup", () => isClicking = false);

  function animate() {
    // Smooth lerp (linear interpolation) following
    ghostX += (mouseX - ghostX) * 0.15;
    ghostY += (mouseY - ghostY) * 0.15;
    
    // Scale 1.2 normally, 1.45 on click for a satisfying pop animation
    const scale = isClicking ? 1.45 : 1.2;
    
    // Mirrored horizontally: scaleX(-1). This positions it right underneath pointing opposite.
    ghost.style.transform = `translate3d(${ghostX}px, ${ghostY}px, 0) scaleX(-1) scale(${scale})`;
    
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  requestAnimationFrame(animate);
})();

// --- Dynamic CTA Hover Tracking ---
(function initDynamicButtons() {
  const dynamicButtons = Array.from(document.querySelectorAll(".button-primary, .promo-popup-button-primary, .promo-popup-button-secondary"));
  if (!dynamicButtons.length) return;

  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const svgNamespace = "http://www.w3.org/2000/svg";

  const createGradientStop = (offset, color, opacity = "1") => {
    const stop = document.createElementNS(svgNamespace, "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    stop.setAttribute("stop-opacity", opacity);

    return stop;
  };

  const createStrokeRect = (className, strokeWidth, strokeValue) => {
    const rect = document.createElementNS(svgNamespace, "rect");
    rect.setAttribute("class", className);
    rect.setAttribute("pathLength", "100");
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke-width", strokeWidth);
    rect.setAttribute("stroke-linecap", "round");
    rect.setAttribute("stroke-linejoin", "round");

    if (strokeValue) {
      rect.setAttribute("stroke", strokeValue);
    }

    return rect;
  };

  const resolveTrimStart = (localX, localY, width, height) => {
    const distances = [
      { side: "top", distance: localY },
      { side: "right", distance: width - localX },
      { side: "bottom", distance: height - localY },
      { side: "left", distance: localX }
    ].sort((left, right) => left.distance - right.distance);

    switch (distances[0].side) {
      case "top":
        return clamp((localX / width) * 25, 0, 25);
      case "right":
        return 25 + clamp((localY / height) * 25, 0, 25);
      case "bottom":
        return 50 + clamp(((width - localX) / width) * 25, 0, 25);
      default:
        return 75 + clamp(((height - localY) / height) * 25, 0, 25);
    }
  };

  dynamicButtons.forEach((btn, buttonIndex) => {
    btn.classList.add("dynamic-button");

    if (!btn.querySelector(".dynamic-button-label")) {
      const label = document.createElement("span");
      label.className = "dynamic-button-label";

      while (btn.firstChild) {
        label.appendChild(btn.firstChild);
      }

      btn.appendChild(label);
    }

    let trimStroke = btn.querySelector(".dynamic-button-stroke");
    let trimEcho;
    let trimResolve;
    let trimFull;
    let trimTrack;

    if (!trimStroke) {
      const trimGradientId = `dynamic-button-trim-${buttonIndex + 1}`;
      const defs = document.createElementNS(svgNamespace, "defs");
      const trimGradient = document.createElementNS(svgNamespace, "linearGradient");

      trimStroke = document.createElementNS(svgNamespace, "svg");
      trimStroke.setAttribute("class", "dynamic-button-stroke");
      trimStroke.setAttribute("viewBox", "0 0 100 100");
      trimStroke.setAttribute("preserveAspectRatio", "none");
      trimStroke.setAttribute("aria-hidden", "true");

      trimGradient.setAttribute("id", trimGradientId);
      trimGradient.setAttribute("x1", "0%");
      trimGradient.setAttribute("y1", "0%");
      trimGradient.setAttribute("x2", "100%");
      trimGradient.setAttribute("y2", "0%");
      trimGradient.append(
        createGradientStop("0%", "#a86d1f", "0.78"),
        createGradientStop("20%", "#e0b96a", "0.96"),
        createGradientStop("48%", "#fff7e7", "1"),
        createGradientStop("76%", "#f0d39d", "0.9"),
        createGradientStop("100%", "#bc8430", "0.72")
      );

      defs.appendChild(trimGradient);
      trimStroke.appendChild(defs);

      trimTrack = createStrokeRect("dynamic-button-stroke-track", "0.7");
      trimEcho = createStrokeRect("dynamic-button-stroke-echo", "2.25", `url(#${trimGradientId})`);
      trimResolve = createStrokeRect("dynamic-button-stroke-resolve", "1.3", `url(#${trimGradientId})`);
      trimFull = createStrokeRect("dynamic-button-stroke-full", "0.92", `url(#${trimGradientId})`);

      trimStroke.append(
        trimTrack,
        trimEcho,
        trimResolve,
        trimFull
      );

      btn.insertBefore(trimStroke, btn.firstChild);
    } else {
      trimTrack = trimStroke.querySelector(".dynamic-button-stroke-track");
      trimEcho = trimStroke.querySelector(".dynamic-button-stroke-echo");
      trimResolve = trimStroke.querySelector(".dynamic-button-stroke-resolve");
      trimFull = trimStroke.querySelector(".dynamic-button-stroke-full");
    }

    const currentState = {
      progress: 0,
      x: 50,
      y: 50,
      tiltX: 0,
      tiltY: 0,
      sheenShift: -18,
      trimStart: 12
    };
    const targetState = { ...currentState };
    let rafId = 0;

    const layoutTrimStroke = () => {
      const rect = btn.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const styles = window.getComputedStyle(btn);
      const outset = Number.parseFloat(styles.getPropertyValue("--dynamic-stroke-outset")) || 0;
      const width = rect.width;
      const height = rect.height;
      const outerWidth = width + (outset * 2);
      const outerHeight = height + (outset * 2);
      const strokeRects = [trimTrack, trimEcho, trimResolve, trimFull].filter(Boolean);

      trimStroke.setAttribute("viewBox", `0 0 ${outerWidth.toFixed(2)} ${outerHeight.toFixed(2)}`);

      strokeRects.forEach((strokeRect) => {
        const strokeWidth = Number.parseFloat(strokeRect.getAttribute("stroke-width")) || 0;
        const inset = strokeWidth / 2;
        const strokeWidthValue = Math.max(0.01, outerWidth - strokeWidth);
        const strokeHeightValue = Math.max(0.01, outerHeight - strokeWidth);
        const radius = Math.max(0.01, strokeHeightValue / 2);

        strokeRect.setAttribute("x", inset.toFixed(2));
        strokeRect.setAttribute("y", inset.toFixed(2));
        strokeRect.setAttribute("width", strokeWidthValue.toFixed(2));
        strokeRect.setAttribute("height", strokeHeightValue.toFixed(2));
        strokeRect.setAttribute("rx", radius.toFixed(2));
        strokeRect.setAttribute("ry", radius.toFixed(2));
      });
    };

    const applyTrimStroke = () => {
      const progress = currentState.progress;
      const trimStart = 100 - currentState.trimStart;
      const echoLength = 5 + (progress * 22);
      const resolveLength = 10 + (progress * 86);
      const fullOpacity = Math.pow(progress, 1.92) * 0.56;

      trimEcho.style.strokeDasharray = `${echoLength.toFixed(2)} 140`;
      trimEcho.style.strokeDashoffset = `${(trimStart - (progress * 9)).toFixed(2)}`;
      trimEcho.style.opacity = `${Math.min(0.72, Math.pow(progress, 1.12) * 0.72).toFixed(3)}`;

      trimResolve.style.strokeDasharray = `${resolveLength.toFixed(2)} 140`;
      trimResolve.style.strokeDashoffset = `${trimStart.toFixed(2)}`;
      trimResolve.style.opacity = `${Math.min(0.84, Math.pow(progress, 0.96) * 0.82).toFixed(3)}`;

      trimFull.style.opacity = `${fullOpacity.toFixed(3)}`;
    };

    const applyState = () => {
      btn.style.setProperty("--hover-progress", currentState.progress.toFixed(4));
      btn.style.setProperty("--hover-x", `${currentState.x.toFixed(2)}%`);
      btn.style.setProperty("--hover-y", `${currentState.y.toFixed(2)}%`);
      btn.style.setProperty("--tilt-x", `${currentState.tiltX.toFixed(2)}deg`);
      btn.style.setProperty("--tilt-y", `${currentState.tiltY.toFixed(2)}deg`);
      btn.style.setProperty("--sheen-shift", `${currentState.sheenShift.toFixed(2)}%`);
      btn.style.setProperty("--trim-start", `${currentState.trimStart.toFixed(2)}px`);
      applyTrimStroke();
    };

    const tick = () => {
      const progressEase = targetState.progress < currentState.progress ? 0.04 : 0.17;
      const pointerEase = targetState.progress < currentState.progress ? 0.07 : 0.18;
      const tiltEase = targetState.progress < currentState.progress ? 0.06 : 0.14;
      const sheenEase = targetState.progress < currentState.progress ? 0.06 : 0.15;

      currentState.progress += (targetState.progress - currentState.progress) * progressEase;
      currentState.x += (targetState.x - currentState.x) * pointerEase;
      currentState.y += (targetState.y - currentState.y) * pointerEase;
      currentState.tiltX += (targetState.tiltX - currentState.tiltX) * tiltEase;
      currentState.tiltY += (targetState.tiltY - currentState.tiltY) * tiltEase;
      currentState.sheenShift += (targetState.sheenShift - currentState.sheenShift) * sheenEase;
      currentState.trimStart += (targetState.trimStart - currentState.trimStart) * 0.12;

      const isSettled =
        Math.abs(targetState.progress - currentState.progress) < 0.001 &&
        Math.abs(targetState.x - currentState.x) < 0.01 &&
        Math.abs(targetState.y - currentState.y) < 0.01 &&
        Math.abs(targetState.tiltX - currentState.tiltX) < 0.01 &&
        Math.abs(targetState.tiltY - currentState.tiltY) < 0.01 &&
        Math.abs(targetState.sheenShift - currentState.sheenShift) < 0.01 &&
        Math.abs(targetState.trimStart - currentState.trimStart) < 0.01;

      applyState();

      if (isSettled) {
        Object.assign(currentState, targetState);
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const ensureTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const setTargetFromPoint = (clientX, clientY, strength = 1, isEntry = false) => {
      const rect = btn.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const localX = clamp(clientX - rect.left, 0, rect.width);
      const localY = clamp(clientY - rect.top, 0, rect.height);
      const px = localX / rect.width;
      const py = localY / rect.height;
      const nx = (px * 2) - 1;
      const ny = (py * 2) - 1;
      const nextTrimStart = resolveTrimStart(localX, localY, rect.width, rect.height);

      targetState.progress = clamp(strength, 0, 1);
      targetState.x = clamp(px * 100, 10, 90);
      targetState.y = clamp(py * 100, 18, 82);
      targetState.tiltX = clamp(ny * -3.9 * strength, -3.9, 3.9);
      targetState.tiltY = clamp(nx * 5.8 * strength, -5.8, 5.8);
      targetState.sheenShift = clamp(-24 + (px * 60), -24, 36);
      if (isEntry) {
        targetState.trimStart = nextTrimStart;
      }

      ensureTick();
    };

    const activateCentered = (strength = 1) => {
      const rect = btn.getBoundingClientRect();
      setTargetFromPoint(rect.left + (rect.width / 2), rect.top + (rect.height / 2), strength, true);
    };

    const resetTarget = () => {
      targetState.progress = 0;
      targetState.x = 50;
      targetState.y = 50;
      targetState.tiltX = 0;
      targetState.tiltY = 0;
      targetState.sheenShift = -18;
      ensureTick();
    };

    if (!reducedMotionQuery.matches && finePointerQuery.matches) {
      btn.addEventListener("pointerenter", (event) => {
        setTargetFromPoint(event.clientX, event.clientY, 1, true);
      });

      btn.addEventListener("pointermove", (event) => {
        setTargetFromPoint(event.clientX, event.clientY);
      });

      btn.addEventListener("pointerleave", resetTarget);
    }

    btn.addEventListener("focus", () => {
      activateCentered(1);
    });

    btn.addEventListener("blur", resetTarget);

    const handleCapabilityChange = () => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) {
        resetTarget();
      }
    };

    finePointerQuery.addEventListener?.("change", handleCapabilityChange);
    reducedMotionQuery.addEventListener?.("change", handleCapabilityChange);

    applyState();
    layoutTrimStroke();
    window.addEventListener("resize", layoutTrimStroke);
  });
})();

// --- Landing Hero Cursor Bulge ---
(function initLandingHeroBulge() {
  const bubblePointsSection = document.querySelector(".bubble-points-section");
  const heroSection = bubblePointsSection?.previousElementSibling;
  if (!bubblePointsSection || !heroSection || !heroSection.classList.contains("page-hero")) return;

  heroSection.classList.add("hero-cursor-reactive");

  const trailNodes = ["a", "b"].map((suffix) => {
    const existingTrail = heroSection.querySelector(`.hero-bulge-trail-${suffix}`);
    if (existingTrail) return existingTrail;

    const trail = document.createElement("span");
    trail.className = `hero-bulge-trail hero-bulge-trail-${suffix}`;
    trail.setAttribute("aria-hidden", "true");
    heroSection.insertBefore(trail, heroSection.firstChild);

    return trail;
  });

  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const createTrailState = () => ({
    x: 50,
    y: 34,
    depth: 0,
    opacity: 0,
    driftX: 0,
    driftY: 0,
    tiltX: 0,
    tiltY: 0
  });

  if (!finePointerQuery.matches || reducedMotionQuery.matches) return;

  const currentState = {
    x: 50,
    y: 34,
    strength: 0,
    depth: 0,
    surge: 0,
    tiltX: 0,
    tiltY: 0,
    stretchX: 1,
    stretchY: 1,
    driftX: 0,
    driftY: 0
  };
  const targetState = { ...currentState };
  const trailStates = trailNodes.map(() => createTrailState());
  const trailTargets = trailNodes.map(() => createTrailState());
  let rafId = 0;
  let releaseTimer = 0;

  const applyState = () => {
    heroSection.style.setProperty("--hero-bulge-x", `${currentState.x.toFixed(2)}%`);
    heroSection.style.setProperty("--hero-bulge-y", `${currentState.y.toFixed(2)}%`);
    heroSection.style.setProperty("--hero-bulge-strength", currentState.strength.toFixed(4));
    heroSection.style.setProperty("--hero-bulge-depth", currentState.depth.toFixed(4));
    heroSection.style.setProperty("--hero-bulge-surge", currentState.surge.toFixed(4));
    heroSection.style.setProperty("--hero-bulge-tilt-x", `${currentState.tiltX.toFixed(2)}deg`);
    heroSection.style.setProperty("--hero-bulge-tilt-y", `${currentState.tiltY.toFixed(2)}deg`);
    heroSection.style.setProperty("--hero-bulge-stretch-x", currentState.stretchX.toFixed(4));
    heroSection.style.setProperty("--hero-bulge-stretch-y", currentState.stretchY.toFixed(4));
    heroSection.style.setProperty("--hero-bulge-drift-x", `${currentState.driftX.toFixed(2)}px`);
    heroSection.style.setProperty("--hero-bulge-drift-y", `${currentState.driftY.toFixed(2)}px`);

    trailNodes.forEach((trailNode, index) => {
      const trailState = trailStates[index];
      trailNode.style.setProperty("--trail-x", `${trailState.x.toFixed(2)}%`);
      trailNode.style.setProperty("--trail-y", `${trailState.y.toFixed(2)}%`);
      trailNode.style.setProperty("--trail-depth", trailState.depth.toFixed(4));
      trailNode.style.setProperty("--trail-opacity", trailState.opacity.toFixed(4));
      trailNode.style.setProperty("--trail-drift-x", `${trailState.driftX.toFixed(2)}px`);
      trailNode.style.setProperty("--trail-drift-y", `${trailState.driftY.toFixed(2)}px`);
      trailNode.style.setProperty("--trail-tilt-x", `${trailState.tiltX.toFixed(2)}deg`);
      trailNode.style.setProperty("--trail-tilt-y", `${trailState.tiltY.toFixed(2)}deg`);
    });
  };

  const tick = () => {
    currentState.x += (targetState.x - currentState.x) * 0.1;
    currentState.y += (targetState.y - currentState.y) * 0.1;
    currentState.strength += (targetState.strength - currentState.strength) * 0.12;
    currentState.depth += (targetState.depth - currentState.depth) * 0.13;
    currentState.surge += (targetState.surge - currentState.surge) * 0.14;
    currentState.tiltX += (targetState.tiltX - currentState.tiltX) * 0.12;
    currentState.tiltY += (targetState.tiltY - currentState.tiltY) * 0.12;
    currentState.stretchX += (targetState.stretchX - currentState.stretchX) * 0.12;
    currentState.stretchY += (targetState.stretchY - currentState.stretchY) * 0.12;
    currentState.driftX += (targetState.driftX - currentState.driftX) * 0.12;
    currentState.driftY += (targetState.driftY - currentState.driftY) * 0.12;

    trailStates.forEach((trailState, index) => {
      const trailTarget = trailTargets[index];
      const easingBase = index === 0 ? 0.14 : 0.1;

      trailState.x += (trailTarget.x - trailState.x) * easingBase;
      trailState.y += (trailTarget.y - trailState.y) * easingBase;
      trailState.depth += (trailTarget.depth - trailState.depth) * (easingBase * 0.92);
      trailState.opacity += (trailTarget.opacity - trailState.opacity) * (easingBase * 0.72);
      trailState.driftX += (trailTarget.driftX - trailState.driftX) * (easingBase * 0.88);
      trailState.driftY += (trailTarget.driftY - trailState.driftY) * (easingBase * 0.88);
      trailState.tiltX += (trailTarget.tiltX - trailState.tiltX) * (easingBase * 0.86);
      trailState.tiltY += (trailTarget.tiltY - trailState.tiltY) * (easingBase * 0.86);
    });

    const isSettled =
      Math.abs(targetState.x - currentState.x) < 0.01 &&
      Math.abs(targetState.y - currentState.y) < 0.01 &&
      Math.abs(targetState.strength - currentState.strength) < 0.001 &&
      Math.abs(targetState.depth - currentState.depth) < 0.001 &&
      Math.abs(targetState.surge - currentState.surge) < 0.001 &&
      Math.abs(targetState.tiltX - currentState.tiltX) < 0.01 &&
      Math.abs(targetState.tiltY - currentState.tiltY) < 0.01 &&
      Math.abs(targetState.stretchX - currentState.stretchX) < 0.001 &&
      Math.abs(targetState.stretchY - currentState.stretchY) < 0.001 &&
      Math.abs(targetState.driftX - currentState.driftX) < 0.01 &&
      Math.abs(targetState.driftY - currentState.driftY) < 0.01 &&
      trailStates.every((trailState, index) => {
        const trailTarget = trailTargets[index];

        return (
          Math.abs(trailTarget.x - trailState.x) < 0.01 &&
          Math.abs(trailTarget.y - trailState.y) < 0.01 &&
          Math.abs(trailTarget.depth - trailState.depth) < 0.001 &&
          Math.abs(trailTarget.opacity - trailState.opacity) < 0.001 &&
          Math.abs(trailTarget.driftX - trailState.driftX) < 0.01 &&
          Math.abs(trailTarget.driftY - trailState.driftY) < 0.01 &&
          Math.abs(trailTarget.tiltX - trailState.tiltX) < 0.01 &&
          Math.abs(trailTarget.tiltY - trailState.tiltY) < 0.01
        );
      });

    applyState();

    if (isSettled) {
      Object.assign(currentState, targetState);
      trailStates.forEach((trailState, index) => {
        Object.assign(trailState, trailTargets[index]);
      });
      rafId = 0;
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  const ensureTick = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const releaseBulge = () => {
    targetState.strength = 0;
    targetState.depth = 0;
    targetState.surge = 0;
    targetState.tiltX = 0;
    targetState.tiltY = 0;
    targetState.stretchX = 1;
    targetState.stretchY = 1;
    targetState.driftX = 0;
    targetState.driftY = 0;

    trailTargets.forEach((trailTarget, index) => {
      trailTarget.depth = 0;
      trailTarget.opacity = 0;
      trailTarget.driftX *= 0.36;
      trailTarget.driftY *= 0.36;
      trailTarget.tiltX *= 0.42;
      trailTarget.tiltY *= 0.42;
    });

    ensureTick();
  };

  const scheduleRelease = () => {
    window.clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(releaseBulge, 3000);
  };

  let lastPointer = null;
  const setTargetFromPoint = (clientX, clientY) => {
    const rect = heroSection.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = clamp((clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((clientY - rect.top) / rect.height, 0, 1);
    const nx = (px * 2) - 1;
    const ny = (py * 2) - 1;
    const distance = Math.min(Math.hypot(nx, ny), 1.25);
    const energy = clamp(1.18 - (distance * 0.68), 0.26, 1);
    const centerBias = Math.pow(energy, 1.1);
    const now = performance.now();
    let motionBoost = 0;

    if (lastPointer) {
      const delta = Math.hypot(px - lastPointer.x, py - lastPointer.y);
      const elapsed = Math.max(now - lastPointer.time, 16);
      motionBoost = clamp((delta / elapsed) * 260, 0, 0.34);
    }

    lastPointer = { x: px, y: py, time: now };
    const lift = centerBias + motionBoost;
    const trailSeed = {
      x: currentState.x,
      y: currentState.y,
      depth: Math.max(0, currentState.depth * 0.72),
      opacity: clamp((currentState.depth * 0.22) + (currentState.surge * 0.32), 0, 0.72),
      driftX: currentState.driftX * 0.56,
      driftY: currentState.driftY * 0.56,
      tiltX: currentState.tiltX * 0.46,
      tiltY: currentState.tiltY * 0.46
    };

    for (let index = trailTargets.length - 1; index > 0; index -= 1) {
      Object.assign(trailTargets[index], trailTargets[index - 1]);
    }
    Object.assign(trailTargets[0], trailSeed);

    targetState.x = clamp(px * 100, 8, 92);
    targetState.y = clamp(py * 100, 10, 90);
    targetState.strength = clamp(energy + (motionBoost * 0.22), 0, 1);
    targetState.depth = 0.24 + (centerBias * 1.02) + (motionBoost * 0.38);
    targetState.surge = 0.12 + (centerBias * 0.22) + (motionBoost * 0.92);
    targetState.tiltX = ny * -7.2 * lift;
    targetState.tiltY = nx * 8.6 * lift;
    targetState.stretchX = 1 + (centerBias * 0.06);
    targetState.stretchY = 1 + (centerBias * 0.06);
    targetState.driftX = nx * (18 + (lift * 28));
    targetState.driftY = ny * (15 + (lift * 24));

    scheduleRelease();
    ensureTick();
  };

  const resetImmediately = () => {
    window.clearTimeout(releaseTimer);
    targetState.strength = 0;
    targetState.depth = 0;
    targetState.surge = 0;
    targetState.tiltX = 0;
    targetState.tiltY = 0;
    targetState.stretchX = 1;
    targetState.stretchY = 1;
    targetState.driftX = 0;
    targetState.driftY = 0;
    lastPointer = null;
    trailTargets.forEach((trailTarget, index) => {
      Object.assign(trailTarget, createTrailState());
      Object.assign(trailStates[index], createTrailState());
    });
    ensureTick();
  };

  heroSection.addEventListener("pointerenter", (event) => {
    setTargetFromPoint(event.clientX, event.clientY);
  });

  heroSection.addEventListener("pointermove", (event) => {
    setTargetFromPoint(event.clientX, event.clientY);
  });

  heroSection.addEventListener("pointerleave", () => {
    lastPointer = null;
    scheduleRelease();
  });
  window.addEventListener("blur", resetImmediately);

  const handleCapabilityChange = () => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) {
      resetImmediately();
    }
  };

  finePointerQuery.addEventListener?.("change", handleCapabilityChange);
  reducedMotionQuery.addEventListener?.("change", handleCapabilityChange);

  applyState();
})();

// --- Bubble Points Interaction ---
(function initBubblePointsInteraction() {
  const shell = document.querySelector(".bubble-points-shell");
  const centerCard = shell?.querySelector(".bubble-center");
  const nodes = shell ? Array.from(shell.querySelectorAll(".bubble-node")) : [];

  if (!shell || !centerCard || !nodes.length) return;

  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!finePointerQuery.matches || reducedMotionQuery.matches) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const round = (value) => value.toFixed(4);
  const normalizeVector = (x, y) => {
    const length = Math.hypot(x, y) || 1;

    return { x: x / length, y: y / length };
  };

  let currentCenterScale = 1;
  let targetCenterScale = 1;
  let currentDepth = 0;
  let targetDepth = 0;
  let currentWarmth = 0;
  let targetWarmth = 0;
  let currentCenterFill = 0;
  let targetCenterFill = 0;
  let currentBorderWidth = 2;
  let targetBorderWidth = 2;
  let currentNodeWarmth = 0;
  let targetNodeWarmth = 0;
  const nodeState = nodes.map(() => ({ scale: 1, targetScale: 1, x: 0, targetX: 0, y: 0, targetY: 0 }));
  let rafId = 0;

  const setVars = () => {
    shell.style.setProperty("--bubble-center-scale", round(currentCenterScale));
    shell.style.setProperty("--bubble-interaction-depth", round(currentDepth));
    shell.style.setProperty("--bubble-shell-warmth", round(currentWarmth));
    shell.style.setProperty("--bubble-center-fill-strength", round(currentCenterFill));
    shell.style.setProperty("--bubble-center-border-width", `${currentBorderWidth.toFixed(2)}px`);
    shell.style.setProperty("--bubble-node-warmth", round(currentNodeWarmth));

    nodes.forEach((node, index) => {
      const state = nodeState[index];
      node.style.setProperty("--bubble-node-scale", round(state.scale));
      node.style.setProperty("--bubble-node-translate-x", `${state.x.toFixed(2)}px`);
      node.style.setProperty("--bubble-node-translate-y", `${state.y.toFixed(2)}px`);
    });
  };

  const resolveNodeRange = (shellRect) => {
    if (shellRect.width < 860) return { minScale: 0.95, maxScale: 1.005, drift: 14 };
    if (shellRect.width < 1080) return { minScale: 0.935, maxScale: 1.01, drift: 18 };
    if (shellRect.width < 1320) return { minScale: 0.92, maxScale: 1.015, drift: 24 };

    return { minScale: 0.91, maxScale: 1.02, drift: 28 };
  };

  const ensureTick = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const tick = () => {
    currentCenterScale += (targetCenterScale - currentCenterScale) * 0.13;
    currentDepth += (targetDepth - currentDepth) * 0.11;
    currentWarmth += (targetWarmth - currentWarmth) * 0.11;
    currentCenterFill += (targetCenterFill - currentCenterFill) * 0.12;
    currentBorderWidth += (targetBorderWidth - currentBorderWidth) * 0.14;
    currentNodeWarmth += (targetNodeWarmth - currentNodeWarmth) * 0.12;

    if (Math.abs(targetCenterScale - currentCenterScale) < 0.0005) currentCenterScale = targetCenterScale;
    if (Math.abs(targetDepth - currentDepth) < 0.0005) currentDepth = targetDepth;
    if (Math.abs(targetWarmth - currentWarmth) < 0.0005) currentWarmth = targetWarmth;
    if (Math.abs(targetCenterFill - currentCenterFill) < 0.0005) currentCenterFill = targetCenterFill;
    if (Math.abs(targetBorderWidth - currentBorderWidth) < 0.01) currentBorderWidth = targetBorderWidth;
    if (Math.abs(targetNodeWarmth - currentNodeWarmth) < 0.0005) currentNodeWarmth = targetNodeWarmth;

    nodeState.forEach((state) => {
      state.scale += (state.targetScale - state.scale) * 0.12;
      state.x += (state.targetX - state.x) * 0.12;
      state.y += (state.targetY - state.y) * 0.12;

      if (Math.abs(state.targetScale - state.scale) < 0.0005) state.scale = state.targetScale;
      if (Math.abs(state.targetX - state.x) < 0.01) state.x = state.targetX;
      if (Math.abs(state.targetY - state.y) < 0.01) state.y = state.targetY;
    });

    setVars();

    if (
      Math.abs(targetCenterScale - currentCenterScale) >= 0.0005 ||
      Math.abs(targetDepth - currentDepth) >= 0.0005 ||
      Math.abs(targetWarmth - currentWarmth) >= 0.0005 ||
      Math.abs(targetCenterFill - currentCenterFill) >= 0.0005 ||
      Math.abs(targetBorderWidth - currentBorderWidth) >= 0.01 ||
      Math.abs(targetNodeWarmth - currentNodeWarmth) >= 0.0005 ||
      nodeState.some((state) =>
        Math.abs(state.targetScale - state.scale) >= 0.0005 ||
        Math.abs(state.targetX - state.x) >= 0.01 ||
        Math.abs(state.targetY - state.y) >= 0.01
      )
    ) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = 0;
    }
  };

  const updateTargets = (clientX, clientY) => {
    const shellRect = shell.getBoundingClientRect();
    const centerRect = centerCard.getBoundingClientRect();
    if (!shellRect.width || !shellRect.height || !centerRect.width || !centerRect.height) return;

    const centerX = centerRect.left + (centerRect.width / 2);
    const centerY = centerRect.top + (centerRect.height / 2);
    const distance = Math.hypot(clientX - centerX, clientY - centerY);
    const influenceRadius = clamp(Math.hypot(shellRect.width, shellRect.height) * 0.34, 240, 430);
    const distanceRatio = clamp(distance / influenceRadius, 0, 1);
    const centerEase = Math.pow(1 - distanceRatio, 1.45);
    const outerEase = Math.pow(distanceRatio, 1.05);
    const nodeRange = resolveNodeRange(shellRect);

    targetCenterScale = 1 + (0.115 * centerEase);
    targetDepth = 0.12 + (0.96 * centerEase);
    targetWarmth = centerEase;
    targetCenterFill = centerEase;
    targetBorderWidth = 2 + (2.4 * centerEase);
    targetNodeWarmth = centerEase;
    shell.style.setProperty("--bubble-focus-x", `${(((clientX - shellRect.left) / shellRect.width) * 100).toFixed(2)}%`);
    shell.style.setProperty("--bubble-focus-y", `${(((clientY - shellRect.top) / shellRect.height) * 100).toFixed(2)}%`);

    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const nodeCenterX = rect.left + (rect.width / 2);
      const nodeCenterY = rect.top + (rect.height / 2);
      const direction = normalizeVector(nodeCenterX - centerX, nodeCenterY - centerY);
      const state = nodeState[index];
      const outwardDrift = nodeRange.drift * centerEase;
      const tangentBias = index === 0 ? 0 : ((index % 2 === 0 ? 1 : -1) * 2.5 * centerEase);

      state.targetScale = nodeRange.minScale + ((nodeRange.maxScale - nodeRange.minScale) * outerEase);
      state.targetX = direction.x * outwardDrift;
      state.targetY = (direction.y * outwardDrift) + tangentBias;
    });

    ensureTick();
  };

  const resetTargets = () => {
    targetCenterScale = 1;
    targetDepth = 0;
    targetWarmth = 0;
    targetCenterFill = 0;
    targetBorderWidth = 2;
    targetNodeWarmth = 0;
    shell.style.setProperty("--bubble-focus-x", "50%");
    shell.style.setProperty("--bubble-focus-y", "50%");

    nodeState.forEach((state) => {
      state.targetScale = 1;
      state.targetX = 0;
      state.targetY = 0;
    });

    ensureTick();
  };

  shell.addEventListener("pointerenter", (event) => updateTargets(event.clientX, event.clientY));
  shell.addEventListener("pointermove", (event) => updateTargets(event.clientX, event.clientY));
  shell.addEventListener("pointerleave", resetTargets);
  window.addEventListener("blur", resetTargets);

  setVars();
})();

