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
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
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

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      projectCards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(" ");
        card.classList.toggle("is-hidden", !(filter === "all" || categories.includes(filter)));
      });
    });
  });
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

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = (data.get("name") || "there").toString().trim();
    const business = (data.get("business") || "your business").toString().trim();

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
  });
}
