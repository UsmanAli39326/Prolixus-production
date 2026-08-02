import subscribeLocalization from "./subscribeLocalization.json";

/**
 * Returns localized subscription page copy dynamically derived from the StaticLocalization API
 * or fallbacks to the subscribeLocalization JSON dictionary.
 *
 * @param {Object} [loc] - Flattened localization object returned by getLocalization()
 */
export function getSubscribeCopy(loc = {}) {
  const get = (key) => loc[key?.toLowerCase()] || loc[key] || subscribeLocalization[key] || "";

  return {
    header: {
      eyebrow: get("subscribe_header_eyebrow"),
      headline: get("subscribe_header_headline"),
      subtext: get("subscribe_header_subtext")
    },
    cycle: {
      tag: get("subscribe_cycle_tag"),
      title: get("subscribe_cycle_title"),
      subtitle: get("subscribe_cycle_subtitle"),
      description: get("subscribe_cycle_desc"),
      steps: [
        {
          days: get("subscribe_cycle_step1_days"),
          label: get("subscribe_cycle_step1_label"),
          detail: get("subscribe_cycle_step1_detail")
        },
        {
          days: get("subscribe_cycle_step2_days"),
          label: get("subscribe_cycle_step2_label"),
          detail: get("subscribe_cycle_step2_detail")
        }
      ]
    },
    trustPillars: [
      {
        id: "manufacturing",
        icon: "fa-solid fa-industry",
        title: get("subscribe_trust_title_1"),
        description: get("subscribe_trust_desc_1")
      },
      {
        id: "two-stage",
        icon: "fa-solid fa-microscope",
        title: get("subscribe_trust_title_2"),
        description: get("subscribe_trust_desc_2")
      },
      {
        id: "externally-verified",
        icon: "fa-solid fa-certificate",
        title: get("subscribe_trust_title_3"),
        description: get("subscribe_trust_desc_3")
      },
      {
        id: "pzn-listed",
        icon: "fa-solid fa-prescription-bottle-medical",
        title: get("subscribe_trust_title_4"),
        description: get("subscribe_trust_desc_4")
      }
    ],
    faqs: [
      {
        question: get("subscribe_faq_q1"),
        answer: get("subscribe_faq_a1")
      },
      {
        question: get("subscribe_faq_q2"),
        answer: get("subscribe_faq_a2")
      },
      {
        question: get("subscribe_faq_q3"),
        answer: get("subscribe_faq_a3")
      },
      {
        question: get("subscribe_faq_q4"),
        answer: get("subscribe_faq_a4")
      }
    ],
    faqHeader: {
      tag: get("subscribe_faq_tag"),
      heading: get("subscribe_faq_heading")
    },
    badges: {
      subscription: get("subscribe_badge_subscription"),
      onetime: get("subscribe_badge_onetime")
    },
    terms: {
      subscription: get("subscribe_terms_subscription"),
      onetime: get("subscribe_terms_onetime")
    },
    cta: {
      subscribe: get("subscribe_cta_subscribe"),
      onetime: get("subscribe_cta_onetime")
    },
    disclosure: {
      prefix: get("subscribe_disclosure_prefix"),
      suffix: get("subscribe_disclosure_suffix")
    }
  };
}

export const SUBSCRIPTION_COPY = getSubscribeCopy();
