import { cache } from 'react';
import { apiService } from '@/lib/api';

/**
 * Fetches localization data from the StaticLocalization API.
 * Uses React cache to ensure it's only called once per request.
 */
export const getLocalization = cache(async () => {
  try {
    debugger
    // Using apiService.get which handles baseUrl and headers
    const response = await apiService.get('/StaticLocalization');
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
