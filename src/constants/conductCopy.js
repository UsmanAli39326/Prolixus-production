import conductLocalization from "./conductLocalization.json";

const ENGLISH_CONDUCT_COPY = {
  conduct_meta_title: "CONDUCT – The Prolixus Referral Program",
  conduct_meta_desc: "Refer Prolixus to friends. 5 successful referrals – get your next monthly supply on us.",
  conduct_hero_eyebrow: "CONDUCT – THE PROLIXUS REFERRAL PROGRAM",
  conduct_hero_headline: "5 successful referrals. Your next monthly supply is on us.",
  conduct_hero_subtext: "Share your personal referral link with friends and family. Earn store credit for every successful order.",
  conduct_hero_cta_loggedout: "Log in & Get Personal Link",
  conduct_hero_cta_subtext: "* Your personal referral link is unlocked automatically after your first order.",
  conduct_hero_cta_loggedin: "Show My Referral Link",
  conduct_hero_secondary_cta: "How it works",

  conduct_steps_tag: "SIMPLE & TRANSPARENT",
  conduct_steps_title: "How CONDUCT works",
  conduct_steps_subtitle: "Three simple steps to your free monthly supply.",
  conduct_step1_title: "1. Order Monthly Supply",
  conduct_step1_desc: "Order your Prolixus monthly supply. After your first purchase, your referral link is activated in your account.",
  conduct_step2_title: "2. Share Personal Link",
  conduct_step2_desc: "Share your link with friends, family, or colleagues. Your referral grants them an exclusive benefit on their first order.",
  conduct_step3_title: "3. Earn Store Credit",
  conduct_step3_desc: "For every successful order made via your link, credit is automatically added to your account. After 5 referrals, your next monthly supply is 100% free.",

  conduct_table_tag: "REWARD OVERVIEW",
  conduct_table_title: "Your path to a free monthly supply",
  conduct_table_subtitle: "For every successful referral, your store credit grows continuously.",
  conduct_table_col_referrals: "Successful Referrals",
  conduct_table_col_reward: "Accumulated Credit",
  conduct_table_col_value: "Value / Benefit",
  conduct_table_row1_refs: "1 Referral",
  conduct_table_row1_reward: "€39.80",
  conduct_table_row1_value: "20% Credit",
  conduct_table_row2_refs: "2 Referrals",
  conduct_table_row2_reward: "€79.60",
  conduct_table_row2_value: "40% Credit",
  conduct_table_row3_refs: "3 Referrals",
  conduct_table_row3_reward: "€119.40",
  conduct_table_row3_value: "60% Credit",
  conduct_table_row4_refs: "4 Referrals",
  conduct_table_row4_reward: "€159.20",
  conduct_table_row4_value: "80% Credit",
  conduct_table_row5_refs: "5 Referrals",
  conduct_table_row5_reward: "€199.00",
  conduct_table_row5_value: "Free Monthly Supply (100%)",

  conduct_brand_tag: "OUR PHILOSOPHY",
  conduct_brand_title: "Why we reward referrals",
  conduct_brand_text1: "At Prolixus, we strongly believe in the power of our product and the trust of our community. Instead of investing in anonymous advertising campaigns, we give this value directly back to those who use Prolixus and recommend it.",
  conduct_brand_text2: "Your trust is our most valuable asset. With the CONDUCT referral program, we create a win-win situation for you and your friends.",

  conduct_share_title: "Your Link. Your Referral. Your Credit.",
  conduct_share_desc: "Copy your referral code and share it directly with your friends.",
  conduct_share_loggedout_title: "Log in to view your link",
  conduct_share_loggedout_desc: "You need an active Prolixus account with at least one completed order to participate in the CONDUCT program.",
  conduct_share_copy: "Copy",
  conduct_share_copied: "Copied!",
  conduct_share_label: "Your Personal Referral Code",

  conduct_faq_tag: "FREQUENTLY ASKED QUESTIONS",
  conduct_faq_title: "Questions about CONDUCT",
  conduct_faq_q1: "How does the CONDUCT referral program work?",
  conduct_faq_a1: "After your first order, you get access to your personal referral code in your Prolixus account. Share this code with friends. As soon as they order, you automatically receive credit toward your next monthly supply.",
  conduct_faq_q2: "When will I receive my credit for a referral?",
  conduct_faq_a2: "Credit is applied to your account as soon as the order of the referred customer is successfully placed and verified.",
  conduct_faq_q3: "How can I redeem my accumulated credit?",
  conduct_faq_a3: "Your credit is managed in your customer account and can be directly applied to your next order or monthly supply during checkout.",
  conduct_faq_q4: "Is there a limit to the number of referrals?",
  conduct_faq_a4: "No, there is no limit. You can refer as many people as you like. Every 5 referrals earns you a full monthly supply.",
  conduct_faq_q5: "How do I get my personal referral link?",
  conduct_faq_a5: "Simply log in to your Prolixus customer account. Under My CONDUCT or on this page, you will find your personal referral code.",
  conduct_faq_q6: "What happens if a referred person cancels their order?",
  conduct_faq_a6: "If an order is cancelled or refunded within the statutory withdrawal period, the credited referral amount will be cancelled.",
  conduct_faq_q7: "Can I withdraw my credit as cash?",
  conduct_faq_a7: "Cash payout of credit is not possible. Credit is exclusively for use toward Prolixus orders and monthly supplies.",

  conduct_bottom_title: "Ready for your first reward?",
  conduct_bottom_desc: "Get your monthly supply now or share your link with friends.",
  conduct_bottom_btn_loggedin: "Go to My CONDUCT in Dashboard",
  conduct_bottom_btn_loggedout: "Log In / Register Now"
};

/**
 * Returns localized CONDUCT page copy derived from the StaticLocalization API
 * or falls back to English / conductLocalization JSON dictionary.
 *
 * @param {Object} [loc] - Flattened localization object returned by getLocalization()
 */
export function getConductCopy(loc = {}) {
  const get = (key) => {
    const k = key?.toLowerCase();
    const val = loc?.[k] ?? loc?.[key];
    if (val && typeof val === "string" && val.trim() !== "") {
      return val;
    }
    return ENGLISH_CONDUCT_COPY[key] || conductLocalization[key] || "";
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

