import { cache } from 'react';
import { apiService } from '@/lib/api';

/**
 * Fetches image URLs from the ImageUrls API.
 * Uses React cache to ensure it's only called once per request.
 */
export const getImageUrls = cache(async () => {
  try {
    const response = await apiService.get('/ImageUrls');
    
    if (response && response.success && Array.isArray(response.data)) {
      // Map names to URLs for easy lookup
      return response.data.reduce((acc, item) => {
        if (item.name) {
          acc[item.name] = item.url;
        }
        return acc;
      }, {});
    }

    return {};
  } catch (error) {
    console.error('ImageUrls fetch error:', error);
    return {};
  }
});
