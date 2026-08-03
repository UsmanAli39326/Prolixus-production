import testimonialsDe from "./testimonialsLocalization.json";

const testimonialsEn = {
  "testimonials_label": "CUSTOMER REVIEWS",
  "testimonials_title_main": "What our customers",
  "testimonials_title_accent": "say about us",
  "testimonials_happy_customers_text": "Over 10,000+ happy customers",
  "testimonials_item1_name": "Michael Carter",
  "testimonials_item1_role": "Aromatherapist",
  "testimonials_item1_text": "These oil droppers are perfect for my essential oil blends! Outstanding precision and quality. Highly recommended!",
  "testimonials_item2_name": "Jenny Wilson",
  "testimonials_item2_role": "Aromatherapist",
  "testimonials_item2_text": "Easy to dispense and completely leak-proof! The quality convinced me right from the first use. Absolutely recommended for anyone valuing top quality.",
  "testimonials_item3_name": "Sophia Reynolds",
  "testimonials_item3_role": "Herbalist",
  "testimonials_item3_text": "Excellent quality and precise handling. I use these daily for my herbal formulations and am thrilled with the results!",
  "testimonials_item4_name": "Olivia Brooks",
  "testimonials_item4_role": "Wellness Coach",
  "testimonials_item4_text": "These products exceeded my expectations! Premium craftsmanship, easy handling, and reliable in daily use."
};

/**
 * Returns localized Testimonials copy derived from the StaticLocalization API,
 * or falls back to English/German dictionaries based on the active language.
 *
 * @param {Object} [loc] - Flattened localization object returned by getLocalization()
 * @param {string} [lang] - Current active language ('en' | 'de')
 */
export function getTestimonialsCopy(loc = {}, lang) {
  const currentLang = lang || (typeof window !== "undefined" ? (localStorage.getItem("appLanguage") || "en") : "en");
  const fallbackDict = currentLang === "de" ? testimonialsDe : testimonialsEn;

  const get = (key) => {
    const k = key?.toLowerCase();
    const val = loc?.[k] ?? loc?.[key];
    return (val && typeof val === "string" && val.trim() !== "") ? val : (fallbackDict[key] || "");
  };

  const item1Text = get("testimonials_item1_text");
  let item2Text = get("testimonials_item2_text");
  let item3Text = get("testimonials_item3_text");
  let item4Text = get("testimonials_item4_text");

  // Prevent duplicate card text if the backend API returns duplicate strings for all items
  if (item2Text && item2Text === item1Text) {
    item2Text = fallbackDict["testimonials_item2_text"];
  }
  if (item3Text && item3Text === item1Text) {
    item3Text = fallbackDict["testimonials_item3_text"];
  }
  if (item4Text && item4Text === item1Text) {
    item4Text = fallbackDict["testimonials_item4_text"];
  }

  return {
    label: get("testimonials_label"),
    title_main: get("testimonials_title_main"),
    title_accent: get("testimonials_title_accent"),
    happy_customers_text: get("testimonials_happy_customers_text"),
    items: [
      {
        name: get("testimonials_item1_name"),
        role: get("testimonials_item1_role"),
        avatar: "/images/author-3.jpg",
        text: item1Text
      },
      {
        name: get("testimonials_item2_name"),
        role: get("testimonials_item2_role"),
        avatar: "/images/author-1.jpg",
        text: item2Text
      },
      {
        name: get("testimonials_item3_name"),
        role: get("testimonials_item3_role"),
        avatar: "/images/author-2.jpg",
        text: item3Text
      },
      {
        name: get("testimonials_item4_name"),
        role: get("testimonials_item4_role"),
        avatar: "/images/author-4.jpg",
        text: item4Text
      }
    ]
  };
}

export const TESTIMONIALS_COPY = getTestimonialsCopy();
