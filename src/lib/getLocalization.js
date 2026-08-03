import { cache } from 'react';
import { apiService } from '@/lib/api';

/**
 * Fetches localization data from the StaticLocalization API.
 * Uses React cache to ensure it's only called once per request.
 */
export const getLocalization = cache(async () => {
  try {
    let lang = 'en';
    try {
      const { cookies } = require("next/headers");
      const cookieStore = await cookies();
      lang = cookieStore.get("appLanguage")?.value || "en";
    } catch (e) {
      if (typeof window !== "undefined") {
        lang = localStorage.getItem("appLanguage") || "en";
      }
    }

    // Pass lang, culture, and language query parameters to ensure API receives current selection
    const response = await apiService.get(`/StaticLocalization?culture=${lang}&lang=${lang}&language=${lang}`);
    console.log('Localization response:', response);

    // Handle new API format: { success: true, data: [{ key: '...', value: '...' }, ...] }
    if (response && response.success && Array.isArray(response.data)) {
      return response.data.reduce((acc, item) => {
        if (item.key) {
          // Convert keys to lowercase to match application usage (e.g., ABOUT_EXPLORE_BUTTON -> about_explore_button)
          acc[item.key.toLowerCase()] = item.value;
        }
        return acc;
      }, {});
    }

    // Handle case where API might already return the flattened object or unexpected format
    return response?.data || response || {};
  } catch (error) {
    console.error('Localization fetch error:', error);
    return {};
  }
});
