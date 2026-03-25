/**
 * Normalize phone number to E.164 format
 * Assumes +91 for 10-digit Indian numbers
 */
export function normalizePhone(phone: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // If it starts with +, keep it
  if (cleaned.startsWith('+')) {
    // Validate E.164 format (should be + followed by 1-15 digits)
    if (/^\+\d{1,15}$/.test(cleaned)) {
      return cleaned;
    }
  }

  // If it's a 10-digit number, assume +91 (India)
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }

  // If it's 11 digits starting with 0, remove 0 and add +91
  if (/^0\d{10}$/.test(cleaned)) {
    return `+91${cleaned.substring(1)}`;
  }

  // If it's 12 digits starting with 91, add +
  if (/^91\d{10}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  // If it's 13 digits starting with 919, it might already be formatted
  if (/^919\d{10}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  // Return as-is if we can't normalize (will be flagged in cleaning)
  return cleaned;
}

/**
 * Validate if a phone number is in E.164 format
 */
export function isValidE164(phone: string): boolean {
  return /^\+\d{1,15}$/.test(phone);
}

/**
 * Generate WhatsApp wa.me link
 */
export function generateWhatsAppLink(phone: string, message?: string): string {
  const normalized = normalizePhone(phone);
  // Remove + for wa.me URL
  const phoneNumber = normalized.replace('+', '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${phoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

