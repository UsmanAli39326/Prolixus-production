/**
 * @typedef {Object} OneTimeOption
 * @property {number} id
 * @property {number} quantity
 * @property {number} price
 * @property {string} label
 */

/**
 * @typedef {Object} SubscriptionOption
 * @property {number} id
 * @property {number} quantity
 * @property {number} price
 * @property {string} label
 */

/**
 * @typedef {Object} ProductPricingRawData
 * @property {number} productId
 * @property {string} productName
 * @property {boolean} subscriptionEnabled
 * @property {string|null} getForFreeUrl
 * @property {number} saveAmount
 * @property {number} discountPercentage
 * @property {OneTimeOption[]} oneTimeOptions
 * @property {SubscriptionOption|null} [subscriptionOption]
 * @property {string[]} [subscriptionBenefits]
 */

/**
 * @typedef {Object} ProductPricingRawResponse
 * @property {boolean} success
 * @property {number} statusCode
 * @property {string} message
 * @property {ProductPricingRawData} data
 * @property {any} errors
 */

/**
 * @typedef {Object} NormalizedProductPricing
 * @property {number} productId
 * @property {string} productName
 * @property {boolean} subscriptionEnabled
 * @property {string|null} getForFreeUrl
 * @property {number} saveAmount
 * @property {number} discountPercentage
 * @property {OneTimeOption[]} oneTimeOptions
 * @property {SubscriptionOption[]} subscriptionPlans
 * @property {string[]} subscriptionBenefits
 */

/**
 * Normalizes the raw API response for product pricing into a cleaner internal shape.
 * Wraps subscriptionOption into an array to support future multi-plan architectures.
 * 
 * @param {ProductPricingRawResponse} raw
 * @returns {NormalizedProductPricing | null}
 */
export function normalizeProductPricing(raw) {
  if (!raw || !raw.success || !raw.data) {
    return null;
  }

  const { data } = raw;

  const subscriptionPlans = [];
  if (data.subscriptionOption) {
    subscriptionPlans.push(data.subscriptionOption);
  }

  return {
    productId: data.productId,
    productName: data.productName,
    subscriptionEnabled: data.subscriptionEnabled,
    getForFreeUrl: data.getForFreeUrl,
    saveAmount: data.saveAmount,
    discountPercentage: data.discountPercentage,
    oneTimeOptions: data.oneTimeOptions || [],
    subscriptionPlans,
    subscriptionBenefits: data.subscriptionBenefits || [],
    productFile: data.productFile || null,
  };
}

import { apiService } from "@/lib/api";

async function getLanguage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("appLanguage") || "en";
  }
  try {
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("appLanguage")?.value || "en";
  } catch (error) {
    return "en";
  }
}

/**
 * Fetches product pricing data by ID from the external API using apiService.
 * 
 * @param {number|string} productId
 * @returns {Promise<NormalizedProductPricing | null>}
 */
export async function getProductPricing(productId) {
  if (!productId) return null;

  try {
    const lang = await getLanguage();
    const rawData = await apiService.get(
      `/ProductPricing/${productId}?culture=${lang}&lang=${lang}`,
      {},
      { cache: 'no-store' }
    );
    return normalizeProductPricing(rawData);
  } catch (error) {
    console.error(`Error fetching product pricing for ID ${productId}:`, error);
    return null;
  }
}

