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
      emailHref: `mailto:hello@tbilisigrowthstudio.ge?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
      whatsappHref: `https://wa.me/995555241890?text=${encodeURIComponent(whatsappText)}`
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

    const whatsappHref = `https://wa.me/995555241890?text=${encodeURIComponent(whatsappText)}`;
    const emailHref = `mailto:hello@tbilisigrowthstudio.ge?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

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
