import conductLocalization from "./conductLocalization.json";

/**
 * Returns localized CONDUCT page copy derived from the StaticLocalization API
 * or falls back to the conductLocalization JSON dictionary.
 *
 * @param {Object} [loc] - Flattened localization object returned by getLocalization()
 */
export function getConductCopy(loc = {}) {
  const get = (key) => {
    const k = key?.toLowerCase();
    const val = loc?.[k] ?? loc?.[key];
    return (val && typeof val === "string" && val.trim() !== "") ? val : (conductLocalization[key] || "");
  };

  return {
    meta: {
      title: get("conduct_meta_title"),
      description: get("conduct_meta_desc")
    },
    hero: {
      eyebrow: get("conduct_hero_eyebrow"),
      headline: get("conduct_hero_headline"),
      subtext: get("conduct_hero_subtext"),
      ctaLoggedout: get("conduct_hero_cta_loggedout"),
      ctaSubtext: get("conduct_hero_cta_subtext"),
      ctaLoggedin: get("conduct_hero_cta_loggedin"),
      secondaryCta: get("conduct_hero_secondary_cta")
    },
    stepsHeader: {
      tag: get("conduct_steps_tag"),
      title: get("conduct_steps_title"),
      subtitle: get("conduct_steps_subtitle")
    },
    steps: [
      {
        stepNumber: "01",
        title: get("conduct_step1_title"),
        description: get("conduct_step1_desc"),
        image: "/images/rewards/conduct-step-1-order.svg",
        direction: "left"
      },
      {
        stepNumber: "02",
        title: get("conduct_step2_title"),
        description: get("conduct_step2_desc"),
        image: "/images/rewards/conduct-step-2-share.svg",
        direction: "right"
      },
      {
        stepNumber: "03",
        title: get("conduct_step3_title"),
        description: get("conduct_step3_desc"),
        image: "/images/rewards/conduct-step-3-credit.svg",
        direction: "left"
      }
    ],
    table: {
      tag: get("conduct_table_tag"),
      title: get("conduct_table_title"),
      subtitle: get("conduct_table_subtitle"),
      cols: {
        referrals: get("conduct_table_col_referrals"),
        reward: get("conduct_table_col_reward"),
        value: get("conduct_table_col_value")
      },
      rows: [
        {
          referrals: get("conduct_table_row1_refs"),
          reward: get("conduct_table_row1_reward"),
          value: get("conduct_table_row1_value")
        },
        {
          referrals: get("conduct_table_row2_refs"),
          reward: get("conduct_table_row2_reward"),
          value: get("conduct_table_row2_value")
        },
        {
          referrals: get("conduct_table_row3_refs"),
          reward: get("conduct_table_row3_reward"),
          value: get("conduct_table_row3_value")
        },
        {
          referrals: get("conduct_table_row4_refs"),
          reward: get("conduct_table_row4_reward"),
          value: get("conduct_table_row4_value")
        },
        {
          referrals: get("conduct_table_row5_refs"),
          reward: get("conduct_table_row5_reward"),
          value: get("conduct_table_row5_value"),
          isHighlight: true
        }
      ]
    },
    brand: {
      tag: get("conduct_brand_tag"),
      title: get("conduct_brand_title"),
      text1: get("conduct_brand_text1"),
      text2: get("conduct_brand_text2")
    },
    share: {
      title: get("conduct_share_title"),
      desc: get("conduct_share_desc"),
      loggedoutTitle: get("conduct_share_loggedout_title"),
      loggedoutDesc: get("conduct_share_loggedout_desc"),
      copy: get("conduct_share_copy"),
      copied: get("conduct_share_copied"),
      label: get("conduct_share_label")
    },
    faqHeader: {
      tag: get("conduct_faq_tag"),
      heading: get("conduct_faq_title")
    },
    faqs: [
      { question: get("conduct_faq_q1"), answer: get("conduct_faq_a1") },
      { question: get("conduct_faq_q2"), answer: get("conduct_faq_a2") },
      { question: get("conduct_faq_q3"), answer: get("conduct_faq_a3") },
      { question: get("conduct_faq_q4"), answer: get("conduct_faq_a4") },
      { question: get("conduct_faq_q5"), answer: get("conduct_faq_a5") },
      { question: get("conduct_faq_q6"), answer: get("conduct_faq_a6") },
      { question: get("conduct_faq_q7"), answer: get("conduct_faq_a7") }
    ],
    bottom: {
      title: get("conduct_bottom_title"),
      desc: get("conduct_bottom_desc"),
      btnLoggedin: get("conduct_bottom_btn_loggedin"),
      btnLoggedout: get("conduct_bottom_btn_loggedout")
    }
  };
}

export const CONDUCT_COPY = getConductCopy();
