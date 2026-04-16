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

const projectDetails = {
  velvet: {
    en: {
      title: "Velvet Beauty House",
      subtitle: "Website relaunch and Instagram cleanup for a premium salon",
      problem:
        "The salon looked active online, but service trust, booking clarity, and premium positioning were inconsistent across the website and Instagram page.",
      solution:
        "We built a cleaner mobile-first website, aligned the visual identity, and added a faster WhatsApp booking path with stronger treatment presentation.",
      tools: "Multi-page website, social templates, WhatsApp CTA flow, local SEO basics",
      outcome:
        "A more polished first impression, clearer services, and a shorter path from profile visit to consultation request."
    },
    ka: {
      title: "Velvet Beauty House",
      subtitle: "სალონისთვის შექმნილი პრემიუმ ვებსაიტის და Instagram-ის განახლება",
      problem:
        "სალონი სოციალურ მედიაში აქტიური ჩანდა, მაგრამ სერვისების ნდობა, დაჯავშნის სიცხადე და პრემიუმ პოზიციონირება ვებსაიტსა და Instagram-ზე არათანმიმდევრული იყო.",
      solution:
        "შევქმენით უფრო სუფთა, მობილურზე მორგებული ვებსაიტი, გავათანაბრეთ ვიზუალური იდენტობა და დავამატეთ უფრო სწრაფი WhatsApp დაჯავშნის გზა.",
      tools: "მრავალგვერდიანი ვებსაიტი, სოციალური შაბლონები, WhatsApp CTA ნაკადი, ლოკალური SEO საფუძვლები",
      outcome:
        "უფრო ძლიერი პირველი შთაბეჭდილება, უფრო გასაგები სერვისები და პროფილის ნახვიდან კონსულტაციის მოთხოვნამდე უფრო მოკლე გზა."
    }
  },
  dental: {
    en: {
      title: "Northline Dental",
      subtitle: "Trust-first clinic site with better appointment flow",
      problem:
        "Important treatment details, doctor credibility, and appointment actions were scattered, which weakened trust for higher-value patients.",
      solution:
        "We created a calm, modern structure with treatment pages, doctor trust blocks, FAQ sections, and direct contact actions across mobile screens.",
      tools: "Website creation, service page structure, conversion copy, form and map setup",
      outcome:
        "Stronger credibility for first-time visitors and a clearer path to calls, messages, and appointment requests."
    },
    ka: {
      title: "Northline Dental",
      subtitle: "კლინიკის ნდობაზე ორიენტირებული საიტი უკეთესი ჩაწერის გზით",
      problem:
        "მკურნალობის მნიშვნელოვანი დეტალები, ექიმების სანდოობა და ჩაწერის მოქმედებები გაფანტული იყო, რაც უფრო მაღალი ღირებულების პაციენტების ნდობას ამცირებდა.",
      solution:
        "შევქმენით მშვიდი, თანამედროვე სტრუქტურა მომსახურების გვერდებით, ექიმების ნდობის ბლოკებით, FAQ სექციებით და პირდაპირი კონტაქტის მოქმედებებით.",
      tools: "ვებსაიტის შექმნა, მომსახურების გვერდების სტრუქტურა, კონვერსიული ტექსტი, ფორმისა და რუკის ინტეგრაცია",
      outcome:
        "უფრო ძლიერი სანდოობა პირველად მოსული ვიზიტორებისთვის და უფრო მკაფიო გზა ზარამდე, შეტყობინებამდე და ჩაწერის მოთხოვნამდე."
    }
  },
  terrace: {
    en: {
      title: "Terrace 41 Cafe",
      subtitle: "Brand refresh and social launch assets for a cafe",
      problem:
        "The venue had good photography, but posts, event promotion, and menu communication lacked a consistent visual system.",
      solution:
        "We built a branded content pack, social templates, and a landing page focused on reservations, map visibility, and seasonal offers.",
      tools: "Branding visuals, social media design, promo landing page, content direction",
      outcome:
        "A tighter online presence that feels more premium and supports bookings for daily guests and event nights."
    },
    ka: {
      title: "Terrace 41 Cafe",
      subtitle: "კაფისთვის ბრენდის განახლება და სოციალური გაშვების მასალები",
      problem:
        "ლოკაციას კარგი ფოტოები ჰქონდა, მაგრამ პოსტებს, ღონისძიებების პრომოუშენს და მენიუს კომუნიკაციას ერთიანი ვიზუალური სისტემა აკლდა.",
      solution:
        "შევქმენით ბრენდირებული კონტენტის პაკეტი, სოციალური შაბლონები და ლენდინგი, რომელიც დაჯავშნებზე, რუკაზე გამოჩენაზე და სეზონურ შეთავაზებებზეა ორიენტირებული.",
      tools: "ბრენდინგის ვიზუალები, სოციალური მედიის დიზაინი, სარეკლამო ლენდინგი, კონტენტის მიმართულება",
      outcome:
        "უფრო შეკრული ონლაინ იერსახე, რომელიც უფრო პრემიუმ ჩანს და ყოველდღიურ სტუმრებსაც და ივენთ-ღამეებსაც უკეთ ემსახურება."
    }
  },
  metro: {
    en: {
      title: "Metro Keys Realty",
      subtitle: "Lead-focused landing pages for property inquiries",
      problem:
        "Listings lived across platforms with no central presentation, weak broker trust framing, and no clean lead capture path.",
      solution:
        "We designed property landing pages, broker profile sections, and WhatsApp-first inquiry flows that feel sharper and easier to act on.",
      tools: "Landing pages, inquiry funnel setup, listing visual system, CTA architecture",
      outcome:
        "Better lead qualification and a more professional handoff from interest to property inquiry."
    },
    ka: {
      title: "Metro Keys Realty",
      subtitle: "უძრავი ქონების მოთხოვნებისთვის ლიდებზე ორიენტირებული ლენდინგები",
      problem:
        "ობიექტები სხვადასხვა პლატფორმაზე იყო განაწილებული, ცენტრალური პრეზენტაცია არ არსებობდა, ბროკერის ნდობის ბლოკები სუსტი იყო და ლიდის აღების გზა არ იყო გამართული.",
      solution:
        "შევქმნით ქონების ლენდინგები, ბროკერის პროფილის სექციები და WhatsApp-ზე ორიენტირებული მოთხოვნის ნაკადები, რომელზეც რეაგირება უფრო მარტივია.",
      tools: "ლენდინგები, მოთხოვნის funnel-ის დაყენება, ლისტინგის ვიზუალური სისტემა, CTA არქიტექტურა",
      outcome:
        "უკეთესი ლიდების კვალიფიკაცია და ინტერესიდან ქონების მოთხოვნამდე უფრო პროფესიული გადასვლა."
    }
  },
  skinroom: {
    en: {
      title: "Skinroom Clinic",
      subtitle: "Medical-aesthetic brand cleanup for trust and clarity",
      problem:
        "Medical and beauty messaging were mixed together, which weakened trust and made treatments harder to compare quickly.",
      solution:
        "We organized the offer hierarchy, elevated the visual language, and built templates that feel clinical, modern, and premium.",
      tools: "Brand visuals, Instagram templates, treatment messaging, conversion layout planning",
      outcome:
        "Stronger perceived quality, clearer treatment communication, and a more consistent presence across web and social touchpoints."
    },
    ka: {
      title: "Skinroom Clinic",
      subtitle: "ნდობისა და სიცხადისთვის გამართული სამედიცინო-ესთეტიკური ბრენდი",
      problem:
        "სამედიცინო და ბიუთი კომუნიკაცია ერთმანეთში იყო არეული, რის გამოც ნდობა სუსტდებოდა და პროცედურების სწრაფად შედარება რთულდებოდა.",
      solution:
        "დავალაგეთ შეთავაზების იერარქია, ავწიეთ ვიზუალური ენა და შევქმენით შაბლონები, რომლებიც კლინიკურ, თანამედროვე და პრემიუმ განცდას ტოვებს.",
      tools: "ბრენდის ვიზუალები, Instagram შაბლონები, პროცედურების კომუნიკაცია, კონვერსიული ლეიაუთის დაგეგმვა",
      outcome:
        "უფრო ძლიერი აღქმადი ხარისხი, უფრო გასაგები პროცედურების კომუნიკაცია და უფრო თანმიმდევრული არსებობა ვებსაიტსა და სოციალურ არხებში."
    }
  },
  capital: {
    en: {
      title: "Capital Loft Rentals",
      subtitle: "Short-term rental presentation for direct inquiries",
      problem:
        "Property visuals were strong, but there was no polished page to explain amenities, neighborhoods, and response speed.",
      solution:
        "We created a direct-booking style landing page with cleaner listing blocks, local trust notes, and social content for availability updates.",
      tools: "Landing page design, social visual templates, inquiry buttons, presentation strategy",
      outcome:
        "A more trustworthy first impression for travelers and owners, plus better conversion potential from social traffic."
    },
    ka: {
      title: "Capital Loft Rentals",
      subtitle: "მოკლევადიანი გაქირავების პრეზენტაცია პირდაპირი მოთხოვნებისთვის",
      problem:
        "ობიექტების ვიზუალები ძლიერი იყო, მაგრამ არ არსებობდა დახვეწილი გვერდი, რომელიც აუხსნიდა კეთილმოწყობას, უბანს და სწრაფ რეაგირებას.",
      solution:
        "შევქმენით პირდაპირ დაჯავშნაზე ორიენტირებული ლენდინგი უფრო სუფთა ლისტინგების ბლოკებით, ლოკალური ნდობის ნიშნებით და ხელმისაწვდომობის სოციალური კონტენტით.",
      tools: "ლენდინგის დიზაინი, სოციალური ვიზუალური შაბლონები, მოთხოვნის ღილაკები, პრეზენტაციის სტრატეგია",
      outcome:
        "უფრო სანდო პირველი შთაბეჭდილება მოგზაურებისთვის და მფლობელებისთვის, ასევე სოციალური ტრაფიკის უკეთესი კონვერსიის პოტენციალი."
    }
  }
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
            <span class="promo-popup-title-main">${escapeHtml(content.titleMain || "")}</span>
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

const modal = document.getElementById("project-modal");

if (modal) {
  const modalTitle = modal.querySelector("[data-modal-title]");
  const modalSubtitle = modal.querySelector("[data-modal-subtitle]");
  const modalProblem = modal.querySelector("[data-modal-problem]");
  const modalSolution = modal.querySelector("[data-modal-solution]");
  const modalTools = modal.querySelector("[data-modal-tools]");
  const modalOutcome = modal.querySelector("[data-modal-outcome]");
  const modalPreview = modal.querySelector("[data-modal-preview]");

  document.querySelectorAll("[data-project-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.projectOpen;
      const details = projectDetails[key]?.[currentLang] || projectDetails[key]?.en;
      const previewSource = trigger.closest(".project-card")?.querySelector(".project-thumb");
      if (!details || !previewSource) return;

      modalTitle.textContent = details.title;
      modalSubtitle.textContent = details.subtitle;
      modalProblem.textContent = details.problem;
      modalSolution.textContent = details.solution;
      modalTools.textContent = details.tools;
      modalOutcome.textContent = details.outcome;
      modalPreview.innerHTML = previewSource.innerHTML;
      modal.showModal();
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => modal.close());
  });

  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const withinBounds =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!withinBounds) {
      modal.close();
    }
  });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const successBanner = document.getElementById("form-success");
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

  if (submitButton && !submitButton.dataset.defaultLabel) {
    submitButton.dataset.defaultLabel = submitButton.textContent.trim();
  }

  const setSubmittingState = (isSubmitting) => {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting
      ? copy.submitting
      : submitButton.dataset.defaultLabel || submitButton.textContent;
  };

  const showBanner = (type, title, text, actions = "") => {
    if (!successBanner) return;
    successBanner.innerHTML = `
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(text)}</p>
      ${actions}
    `;
    successBanner.classList.add("is-visible");
    successBanner.classList.toggle("is-error", type === "error");
    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
      const payload = {
        name: trimValue(data.get("name")),
        business: trimValue(data.get("business")),
        contact: trimValue(data.get("contact")),
        service: trimValue(data.get("service")),
        message: trimValue(data.get("message")),
        website: trimValue(data.get("website")),
        page: trimValue(data.get("page")) || window.location.pathname.split("/").pop() || "contact.html",
        language: trimValue(data.get("language")) || currentLang
      };

      if (!payload.name || !payload.business || !payload.contact || !payload.message) {
        contactForm.reportValidity();
        return;
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

    return;

    const data = new FormData(contactForm);
    const name = (data.get("name") || "there").toString().trim();
    const business = (data.get("business") || "your business").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const emailSubject =
      currentLang === "ka"
        ? `ახალი მოთხოვნა - ${business}`
        : `New project inquiry - ${business}`;

    const emailBody =
      currentLang === "ka"
        ? [
            `სახელი: ${name}`,
            `ბიზნესი: ${business}`,
            `კონტაქტი: ${contact}`,
            `სერვისი: ${service || "არ არის მითითებული"}`,
            "",
            "მესიჯი:",
            message
          ].join("\n")
        : [
            `Name: ${name}`,
            `Business: ${business}`,
            `Contact: ${contact}`,
            `Service: ${service || "Not specified"}`,
            "",
            "Message:",
            message
          ].join("\n");

    const whatsappText =
      currentLang === "ka"
        ? [
            `გამარჯობა, მე ვარ ${name}.`,
            `ბიზნესი: ${business}`,
            `კონტაქტი: ${contact}`,
            `სერვისი: ${service || "არ არის მითითებული"}`,
            "",
            message
          ].join("\n")
        : [
            `Hello, my name is ${name}.`,
            `Business: ${business}`,
            `Contact: ${contact}`,
            `Service needed: ${service || "Not specified"}`,
            "",
            message
          ].join("\n");

    const whatsappHref = `https://wa.me/995597199500?text=${encodeURIComponent(whatsappText)}`;
    const emailHref = `mailto:tbilisigrowthstudio@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    if (successBanner) {
      const bannerTitle =
        currentLang === "ka" ? "თქვენი მოთხოვნის მონახაზი მზად არის." : "Your request draft is ready.";
      const bannerText =
        currentLang === "ka"
          ? `${name}, აირჩიეთ WhatsApp ან email ქვემოთ და გაგზავნეთ წინასწარ შევსებული მოთხოვნა ${business}-ისთვის.`
          : `${name}, choose WhatsApp or email below to send your pre-filled request for ${business}.`;
      const whatsappLabel =
        currentLang === "ka" ? "გახსენით WhatsApp-ის მონახაზი" : "Open WhatsApp draft";
      const emailLabel =
        currentLang === "ka" ? "გახსენით email-ის მონახაზი" : "Open email draft";

      successBanner.innerHTML = `
        <strong>${escapeHtml(bannerTitle)}</strong>
        <p>${escapeHtml(bannerText)}</p>
        <div class="success-actions">
          <a class="button button-primary" href="${whatsappHref}" target="_blank" rel="noopener noreferrer">${escapeHtml(whatsappLabel)}</a>
          <a class="button button-secondary" href="${emailHref}">${escapeHtml(emailLabel)}</a>
        </div>
      `;
      successBanner.classList.add("is-visible");
      successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    contactForm.reset();
    return;
    /*

    if (successBanner) {
      if (currentLang === "ka") {
        successBanner.textContent =
          "გმადლობთ, " +
          name +
          ". " +
          business +
          " შესახებ თქვენი ინფორმაცია მიღებულია და ერთ სამუშაო დღეში დაგიკავშირდებით. თუ საქმე სასწრაფოა, გამოიყენეთ ქვემოთ მითითებული WhatsApp.";
      } else {
        successBanner.textContent =
          "Thanks " +
          name +
          ". We have your details for " +
          business +
          " and will reply within one business day. If it is urgent, use WhatsApp below.";
      }
      successBanner.classList.add("is-visible");
      successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    contactForm.reset();
    */
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
(function initShatterButtons() {
  const shatterButtons = document.querySelectorAll(".button-primary, .promo-popup-button-primary");
  if (!shatterButtons.length) return;

  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const normalizeVector = (x, y) => {
    const length = Math.hypot(x, y) || 1;

    return { x: x / length, y: y / length, length };
  };
  const seededUnit = (seed) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;

    return value - Math.floor(value);
  };
  const resolveEscapeVector = (impactX, impactY, pointerX, pointerY) => {
    const mixedImpactX = (impactX * 0.78) + (pointerX * 0.22);
    const mixedImpactY = (impactY * 0.78) + (pointerY * 0.22);
    const strength = Math.min(Math.hypot(mixedImpactX, mixedImpactY), 1.15);

    if (strength < 0.04) {
      return { x: 0, y: 0, strength: 0, angle: 0 };
    }

    const escape = normalizeVector(-mixedImpactX, -mixedImpactY);

    return {
      x: escape.x,
      y: escape.y,
      strength,
      angle: Math.atan2(escape.y, escape.x)
    };
  };

  shatterButtons.forEach((btn, buttonIndex) => {
    if (!btn.querySelector(".shatter-text-layer")) {
      const textLayer = document.createElement("span");
      textLayer.className = "shatter-text-layer";

      while (btn.firstChild) {
        textLayer.appendChild(btn.firstChild);
      }

      btn.appendChild(textLayer);
    }

    const textLayer = btn.querySelector(".shatter-text-layer");

    if (textLayer && !textLayer.querySelector(".shatter-word-set")) {
      const labelText = textLayer.textContent.replace(/\s+/g, " ").trim();
      const wordsWrap = document.createElement("span");
      const words = labelText ? labelText.split(" ") : [""];
      const midpoint = (words.length - 1) / 2;

      wordsWrap.className = "shatter-word-set";
      textLayer.textContent = "";

      words.forEach((word, index) => {
        const wordEl = document.createElement("span");
        const distanceFromCenter = index - midpoint;
        const direction = distanceFromCenter === 0 ? (index % 2 === 0 ? -1 : 1) : Math.sign(distanceFromCenter);
        const magnitude = Math.abs(distanceFromCenter);

        wordEl.className = "shatter-word";
        wordEl.textContent = word;
        wordEl.style.setProperty("--word-x", `${(direction * (6 + (magnitude * 4))) + (distanceFromCenter * 2)}px`);
        wordEl.style.setProperty("--word-y", `${(index % 2 === 0 ? -1 : 1) * (2.8 + (magnitude * 2.2))}px`);
        wordEl.style.setProperty("--word-rotate", `${direction * (2.6 + (magnitude * 1.9))}deg`);

        wordsWrap.appendChild(wordEl);
      });

      textLayer.appendChild(wordsWrap);
    }

    let fragmentsContainer = btn.querySelector(".shatter-fragments");

    if (!fragmentsContainer) {
      fragmentsContainer = document.createElement("span");
      fragmentsContainer.className = "shatter-fragments";
      btn.insertBefore(fragmentsContainer, textLayer);
    }

    const currentState = {
      progress: 0,
      x: 50,
      y: 50,
      tiltX: 0,
      tiltY: 0,
      sheenShift: -20,
      driftX: 0,
      driftY: 0,
      impactX: 0,
      impactY: 0,
      pointerX: 0,
      pointerY: 0
    };

    const targetState = { ...currentState };
    const fragmentMeta = [];
    let rafId = 0;
    let layoutKey = "";

    const buildFragments = () => {
      const rect = btn.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nextLayoutKey = `${Math.round(rect.width)}x${Math.round(rect.height)}`;
      if (nextLayoutKey === layoutKey && fragmentMeta.length) return;

      layoutKey = nextLayoutKey;
      fragmentMeta.length = 0;
      fragmentsContainer.innerHTML = "";

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const orbitX = (rect.width / 2) + 10;
      const orbitY = (rect.height / 2) + 8;
      const fragmentCount = Math.round(clamp(rect.width / 9, 16, 24));

      for (let index = 0; index < fragmentCount; index += 1) {
        const seed = ((buttonIndex + 1) * 97) + index + 1;
        const radialNoise = seededUnit(seed + 0.17);
        const heightNoise = seededUnit(seed + 0.37);
        const driftNoise = seededUnit(seed + 0.61);
        const spinNoise = seededUnit(seed + 0.83);
        const opacityNoise = seededUnit(seed + 1.09);
        const theta = ((index / fragmentCount) * Math.PI * 2) - (Math.PI / 2);
        const orbitOffset = (radialNoise - 0.5) * 10;
        const originX = centerX + (Math.cos(theta) * (orbitX + orbitOffset));
        const originY = centerY + (Math.sin(theta) * (orbitY + (orbitOffset * 0.6)));
        const size = 8 + (radialNoise * 10);
        const fragment = document.createElement("span");

        fragment.className = "shatter-fragment";
        fragment.style.left = `${originX.toFixed(2)}px`;
        fragment.style.top = `${originY.toFixed(2)}px`;
        fragment.style.width = `${size.toFixed(2)}px`;
        fragment.style.height = `${(size * (0.72 + (heightNoise * 0.42))).toFixed(2)}px`;

        fragmentsContainer.appendChild(fragment);
        fragmentMeta.push({
          element: fragment,
          angle: theta,
          burst: 20 + (radialNoise * 28),
          drift: -8 + (driftNoise * 16),
          spin: -95 + (spinNoise * 190),
          scale: 0.54 + (heightNoise * 0.82),
          opacity: 0.36 + (opacityNoise * 0.46)
        });
      }
    };

    const updateFragments = (nx = 0, ny = 0, impactX = nx, impactY = ny) => {
      const pointerStrength = Math.min(Math.hypot(nx, ny), 1.15);
      const escapeVector = resolveEscapeVector(impactX, impactY, nx, ny);
      const sweepVector = pointerStrength < 0.04
        ? normalizeVector(-escapeVector.y || 0.001, escapeVector.x || 0.001)
        : normalizeVector(-ny, nx);

      fragmentMeta.forEach((fragment, index) => {
        const oppositeBias = escapeVector.strength < 0.04
          ? 0.72
          : clamp((Math.cos(fragment.angle - escapeVector.angle) + 1) / 2, 0.08, 1);
        const impactBias = escapeVector.strength < 0.04
          ? 0.24
          : clamp((Math.cos(fragment.angle - (escapeVector.angle + Math.PI)) + 1) / 2, 0, 1);
        const outward = fragment.burst * (0.34 + (oppositeBias * 1.5));
        const tangentX = -Math.sin(fragment.angle);
        const tangentY = Math.cos(fragment.angle);
        const globalEscape = escapeVector.strength < 0.04 ? 0 : 10 + (escapeVector.strength * 18);
        const sweep = pointerStrength < 0.04 ? 0 : 4 + (pointerStrength * 9);
        const escapePush = globalEscape * (0.52 + (oppositeBias * 0.94));
        const recoilDrag = 2 + (impactBias * 8);
        const spinBias = (index % 2 === 0 ? 1 : -1) * (
          (escapeVector.x * 58) +
          (escapeVector.y * 38) +
          (pointerStrength * 16)
        );
        const x =
          (Math.cos(fragment.angle) * outward) +
          (tangentX * fragment.drift) +
          (sweepVector.x * sweep * (0.18 + (oppositeBias * 0.34))) +
          (escapeVector.x * escapePush) -
          (Math.cos(fragment.angle) * recoilDrag * impactBias);
        const y =
          (Math.sin(fragment.angle) * outward) +
          (tangentY * fragment.drift) +
          (sweepVector.y * sweep * (0.18 + (oppositeBias * 0.34))) +
          (escapeVector.y * escapePush) -
          (Math.sin(fragment.angle) * recoilDrag * impactBias);

        fragment.element.style.setProperty("--fragment-x", `${x.toFixed(2)}px`);
        fragment.element.style.setProperty("--fragment-y", `${y.toFixed(2)}px`);
        fragment.element.style.setProperty("--fragment-rotate", `${(fragment.spin + spinBias).toFixed(2)}deg`);
        fragment.element.style.setProperty("--fragment-scale", `${(fragment.scale * (0.84 + (oppositeBias * 0.28))).toFixed(3)}`);
        fragment.element.style.setProperty("--fragment-opacity", `${(fragment.opacity * (0.4 + (oppositeBias * 0.86)) * (1 - (impactBias * 0.12))).toFixed(3)}`);
      });
    };

    const applyState = () => {
      btn.style.setProperty("--hover-progress", currentState.progress.toFixed(4));
      btn.style.setProperty("--hover-x", `${currentState.x.toFixed(2)}%`);
      btn.style.setProperty("--hover-y", `${currentState.y.toFixed(2)}%`);
      btn.style.setProperty("--tilt-x", `${currentState.tiltX.toFixed(2)}deg`);
      btn.style.setProperty("--tilt-y", `${currentState.tiltY.toFixed(2)}deg`);
      btn.style.setProperty("--sheen-shift", `${currentState.sheenShift.toFixed(2)}%`);
      btn.style.setProperty("--shatter-drift-x", `${currentState.driftX.toFixed(2)}px`);
      btn.style.setProperty("--shatter-drift-y", `${currentState.driftY.toFixed(2)}px`);
    };

    const tick = () => {
      currentState.progress += (targetState.progress - currentState.progress) * 0.16;
      currentState.x += (targetState.x - currentState.x) * 0.18;
      currentState.y += (targetState.y - currentState.y) * 0.18;
      currentState.tiltX += (targetState.tiltX - currentState.tiltX) * 0.14;
      currentState.tiltY += (targetState.tiltY - currentState.tiltY) * 0.14;
      currentState.sheenShift += (targetState.sheenShift - currentState.sheenShift) * 0.16;
      currentState.driftX += (targetState.driftX - currentState.driftX) * 0.18;
      currentState.driftY += (targetState.driftY - currentState.driftY) * 0.18;

      const isSettled =
        Math.abs(targetState.progress - currentState.progress) < 0.001 &&
        Math.abs(targetState.x - currentState.x) < 0.01 &&
        Math.abs(targetState.y - currentState.y) < 0.01 &&
        Math.abs(targetState.tiltX - currentState.tiltX) < 0.01 &&
        Math.abs(targetState.tiltY - currentState.tiltY) < 0.01 &&
        Math.abs(targetState.sheenShift - currentState.sheenShift) < 0.01 &&
        Math.abs(targetState.driftX - currentState.driftX) < 0.01 &&
        Math.abs(targetState.driftY - currentState.driftY) < 0.01;

      if (isSettled) {
        Object.assign(currentState, targetState);
        applyState();
        rafId = 0;
        return;
      }

      applyState();
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
      const distance = Math.min(Math.hypot(nx, ny), 1.3);
      const energy = clamp(1 - (distance * 0.58), 0.3, 1);

      targetState.progress = clamp((0.45 + (energy * 0.55)) * strength, 0, 1);
      targetState.x = clamp(px * 100, 14, 86);
      targetState.y = clamp(py * 100, 18, 82);
      targetState.tiltX = clamp(ny * -4.5 * strength, -4.5, 4.5);
      targetState.tiltY = clamp(nx * 6.5 * strength, -6.5, 6.5);
      targetState.sheenShift = clamp(-26 + (px * 64), -26, 38);
      if (isEntry || Math.hypot(targetState.impactX, targetState.impactY) < 0.04) {
        targetState.impactX = nx;
        targetState.impactY = ny;
      } else {
        targetState.impactX = (targetState.impactX * 0.88) + (nx * 0.12);
        targetState.impactY = (targetState.impactY * 0.88) + (ny * 0.12);
      }
      const escapeVector = resolveEscapeVector(targetState.impactX, targetState.impactY, nx, ny);
      targetState.driftX = escapeVector.x * (2.6 + (escapeVector.strength * 6.6)) * strength;
      targetState.driftY = escapeVector.y * (1.8 + (escapeVector.strength * 5.4)) * strength;
      targetState.pointerX = nx;
      targetState.pointerY = ny;
      buildFragments();
      updateFragments(nx, ny, targetState.impactX, targetState.impactY);
      ensureTick();
    };

    const activateCentered = (strength = 1) => {
      const rect = btn.getBoundingClientRect();
      setTargetFromPoint(rect.left + (rect.width / 2), rect.top + (rect.height / 2), strength);
    };

    const resetTarget = () => {
      targetState.progress = 0;
      targetState.x = 50;
      targetState.y = 50;
      targetState.tiltX = 0;
      targetState.tiltY = 0;
      targetState.sheenShift = -20;
      targetState.driftX = 0;
      targetState.driftY = 0;
      targetState.impactX = 0;
      targetState.impactY = 0;
      targetState.pointerX = 0;
      targetState.pointerY = 0;
      updateFragments(0, 0, 0, 0);
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

    window.addEventListener("resize", () => {
      layoutKey = "";
      buildFragments();
      updateFragments(targetState.pointerX, targetState.pointerY, targetState.impactX, targetState.impactY);
    });

    buildFragments();
    updateFragments(0, 0, 0, 0);
    applyState();
  });
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

