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

  let cleanPath = path.trim();
  if (!cleanPath) return '';

  // If already absolute HTTP URL, upgrade http to https if it matches admin backend domain to avoid mixed content in production
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    if (cleanPath.startsWith('http://admin.aa-consultants.de')) {
      return cleanPath.replace('http://admin.aa-consultants.de', 'https://admin.aa-consultants.de');
    }
    return cleanPath;
  }

  // Priority for backend base URL:
  // 1. Explicit NEXT_PUBLIC_IMAGE_BASE_URL
  // 2. Extracted domain from NEXT_PUBLIC_API_BASE_URL (e.g. https://admin.aa-consultants.de/api -> https://admin.aa-consultants.de)
  // 3. Extracted domain from BASE_URL
  // 4. NEXT_PUBLIC_BASE_URL if it points to admin
  // 5. Fallback default backend domain
  let baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  if (!baseUrl && process.env.NEXT_PUBLIC_API_BASE_URL) {
    try {
      const urlObj = new URL(process.env.NEXT_PUBLIC_API_BASE_URL);
      baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    } catch (e) {
      baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/?$/, '');
    }
  }

  if (!baseUrl && BASE_URL) {
    try {
      const urlObj = new URL(BASE_URL);
      baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    } catch (e) {
      baseUrl = BASE_URL.replace(/\/api\/?$/, '');
    }
  }

  if (!baseUrl && process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.includes('admin')) {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (!baseUrl) {
    baseUrl = 'https://admin.aa-consultants.de';
  }

  baseUrl = baseUrl.replace(/\/$/, '');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  return `${baseUrl}${normalizedPath}`;
}

