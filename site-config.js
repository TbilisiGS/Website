window.TGSiteConfig = {
  contact: {
    whatsappNumber: "995597199500"
  },
  promoPopup: {
    // Bump the version when you want the offer to show again for visitors who previously hid it.
    enabled: true,
    version: "2026-04-website-offer-v1",
    delayMs: 900,
    hideForDays: 14,
    showOnPages: ["home", "services", "portfolio", "about", "contact"],
    content: {
      en: {
        eyebrow: "Limited-Time Website Offer",
        titleTop: "Hot Sale Offer",
        titleMain: "Let us create\nyour unique website",
        description:
          "Premium, tailored web design for local businesses that need a sharper first impression, stronger trust, and faster inquiry flow.",
        points: [
          "Tailored design for your business",
          "Mobile-first layout and CTA setup",
          "WhatsApp-ready contact flow"
        ],
        primaryCta: {
          type: "whatsapp",
          label: "Claim Offer",
          message: "Hello, I saw your website offer and want details for my business."
        },
        secondaryCta: {
          type: "link",
          label: "Learn More",
          href: "services.html"
        },
        optOutLabel: "Do not show this offer again for 14 days"
      },
      ka: {
        eyebrow: "ვებსაიტის სპეციალური შეთავაზება",
        titleTop: "ცხელი შეთავაზება",
        titleMain: "შევქმნათ თქვენი\nუნიკალური ვებსაიტი",
        description:
          "პრემიუმ, ბიზნესზე მორგებული ვებსაიტი ძლიერი პირველი შთაბეჭდილებისთვის, მეტი ნდობისთვის და უფრო მარტივი მოთხოვნების მისაღებად.",
        points: [
          "თქვენს ბიზნესზე მორგებული დიზაინი",
          "მობილურზე გამართული სტრუქტურა და CTA",
          "WhatsApp-ზე ორიენტირებული საკონტაქტო გზა"
        ],
        primaryCta: {
          type: "whatsapp",
          label: "შეთავაზების მიღება",
          message: "გამარჯობა, ვნახე თქვენი ვებსაიტის შეთავაზება და მეტი დეტალი მაინტერესებს ჩემი ბიზნესისთვის."
        },
        secondaryCta: {
          type: "link",
          label: "მეტის ნახვა",
          href: "services-ka.html"
        },
        optOutLabel: "ეს შეთავაზება 14 დღის განმავლობაში აღარ მაჩვენო"
      }
    }
  }
};
