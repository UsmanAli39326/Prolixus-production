import { apiService, BASE_URL } from "@/lib/api";

const IMAGE_URLS_ENDPOINT = "/ImageUrls";

/**
 * Fetch image details by name.
 * GET /api/ImageUrls/{name}
 */

export async function getImageUrlByName(name) {
  return apiService.get(`${IMAGE_URLS_ENDPOINT}/${name}`);
}

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const baseUrl = BASE_URL 
    ? BASE_URL.replace(/\/api\/?$/, '') 
    : 'https://prolixus.aa-consultants.de';
    
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
}
