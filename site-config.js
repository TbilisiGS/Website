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
        eyebrow: "Website Design Offer",
        titleTop: "Website Offer",
        titleMain: "Let us create\nyour unique website",
        description:
          "Premium, tailored web design for local businesses that need a sharper first impression, stronger trust, and easier contact.",
        points: [
          "Tailored design for your business",
          "Mobile-first layout and clear contact path",
          "WhatsApp and form contact path"
        ],
        primaryCta: {
          type: "whatsapp",
          label: "Get Offer Details",
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
        titleTop: "ვებსაიტის შეთავაზება",
        titleMain: "შევქმნათ თქვენი\nუნიკალური ვებსაიტი",
        description:
          "ბიზნესზე მორგებული პრემიუმ ვებსაიტი ძლიერი პირველი შთაბეჭდილებისთვის, მეტი ნდობისთვის და უფრო მარტივი კონტაქტისთვის.",
        points: [
          "თქვენს ბიზნესზე მორგებული დიზაინი",
          "მობილურზე გამართული სტრუქტურა და მკაფიო საკონტაქტო გზა",
          "WhatsApp-ისა და ფორმის გამართული კონტაქტი"
        ],
        primaryCta: {
          type: "whatsapp",
          label: "დეტალების მიღება",
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
