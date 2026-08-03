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
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl && BASE_URL) {
    baseUrl = BASE_URL.replace(/\/api\/?$/, '');
  }
  if (!baseUrl) {
    baseUrl = 'https://admin.aa-consultants.de';
  }

  baseUrl = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
