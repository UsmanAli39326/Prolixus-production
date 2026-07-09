import { cache } from 'react';
import { apiService } from '@/lib/api';

/**
 * Fetches custom pages data from the Configuration/custompages API.
 * Uses React cache to ensure it's only called once per request.
 */

export const getCustomPages = cache(async () => {
  try {
    const response = await apiService.get('/Configuration/custompages');

    if (response && response.success && Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error('Custom pages fetch error:', error);
    return [];
  }
});