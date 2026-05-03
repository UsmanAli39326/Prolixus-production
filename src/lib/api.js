export const dynamic = 'force-dynamic'
export const fetchCache = 'default-no-store'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Read the auth token at request-time so the token stored during login is used.
// Falls back to the build-time env var if localStorage is not available (e.g. SSR).
async function getLanguage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("appLanguage") || "en";
  }

  // Server-side: Try to read from cookies
  try {
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("appLanguage")?.value || "en";
  } catch (error) {
    return "en"; // Fallback
  }
}

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || process.env.NEXT_PUBLIC_API_TOKEN;
  }
  return process.env.NEXT_PUBLIC_API_TOKEN;
}

function getBrowserTimeZone() {
  if (typeof window !== "undefined") {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      return null;
    }
  }
  return null;
}

async function request(endpoint, method = 'GET', body = null, headers = {}, isGuest = false, options = {}) {
  const token = isGuest ? process.env.NEXT_PUBLIC_API_TOKEN : getToken();

  // Add cache buster for GET requests, except for specific endpoints
  const skipCacheBuster = endpoint.includes('/about') || endpoint.includes('/shopmenus');
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = (method === 'GET' && !skipCacheBuster)
    ? `${BASE_URL}${endpoint}${separator}t=${Date.now()}`
    : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': await getLanguage(),
      'Local-TimeZone': getBrowserTimeZone(),
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API request failed');
  }

  return response.json();
}

/* =====================
   GENERIC CRUD METHODS
   ===================== */

export const apiService = {
  get: (endpoint, headers, options) =>
    request(endpoint, 'GET', null, headers, false, options),

  post: (endpoint, data, headers, options) =>
    request(endpoint, 'POST', data, headers, false, options),

  postGuest: (endpoint, data, headers, options) =>
    request(endpoint, 'POST', data, headers, true, options),

  put: (endpoint, data, headers, options) =>
    request(endpoint, 'PUT', data, headers, false, options),

  delete: (endpoint, headers, options) =>
    request(endpoint, 'DELETE', null, headers, false, options),
};
