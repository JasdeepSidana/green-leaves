/**
 * Security & Data Sanitization Utilities
 * Protects against XSS, injection, prototype pollution, and malformed state.
 */

/**
 * Strips script tags, HTML tags, dangerous attributes, and escapes unsafe characters
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    // Remove script and style tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]+>/g, '')
    // Strip javascript: pseudo-protocols
    .replace(/javascript:/gi, '')
    // Strip onload, onerror, onclick handlers
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .trim();
}

/**
 * Validates Indian 10-digit mobile numbers (optionally prefixed with +91 or 0)
 */
export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Matches +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, or XXXXXXXXXX where X is 6-9 followed by 9 digits
  const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Clean phone to standardized 10-digit or +91 format
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone.trim();
}

/**
 * Basic RFC 5322 compliant email validator
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates 6-digit Indian PIN Code
 */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

/**
 * Safe local storage reader with type fallback and JSON parse protection
 */
export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    
    // Prototype pollution defense
    if (parsed && typeof parsed === 'object') {
      delete (parsed as Record<string, unknown>).__proto__;
      delete (parsed as Record<string, unknown>).constructor;
      delete (parsed as Record<string, unknown>).prototype;
    }
    return parsed as T;
  } catch (error) {
    console.warn(`[SafeStorage] Error reading key "${key}", using fallback:`, error);
    return fallback;
  }
}

/**
 * Safe local storage writer
 */
export function safeSetStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.warn(`[SafeStorage] Error writing key "${key}":`, error);
    return false;
  }
}
