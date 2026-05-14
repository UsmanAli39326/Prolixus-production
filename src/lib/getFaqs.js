import { cache } from 'react';
import { apiService } from '@/lib/api';

/**
 * Fetches FAQs data from the Configuration/faqs API.
 * Uses React cache to ensure it's only called once per request.
 */
export const getFaqs = cache(async () => {
  try {
    const response = await apiService.get('/Configuration/faqs');
    
    if (response && response.success && Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('FAQs fetch error:', error);
    return [];
  }
});
