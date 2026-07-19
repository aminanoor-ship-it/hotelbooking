const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5008/api'
// Server origin without the trailing "/api" (e.g. http://localhost:5008)
const SERVER_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '')

/**
 * Resolves a stored hotel image value to a displayable URL.
 * - Absolute URLs (http/https) are returned as-is (fallbacks, legacy data).
 * - Relative upload paths (/uploads/...) are prefixed with the backend origin.
 * - Empty values return the provided fallback (or empty string).
 */
export function resolveImageUrl(path, fallback = '') {
  if (!path) return fallback
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SERVER_ORIGIN}${normalized}`
}
