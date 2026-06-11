export const normalizeWhatsAppNumber = (number) => {
  // Remove all non-digit characters
  const cleaned = number.replace(/[^0-9]/g, "");
  if (!cleaned) return "";
  // If starts with country code 91 and length is 12, keep as is
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned;
  }
  // If length is 10, assume Indian number and prefix 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  // If length is 12 but does not start with 91, keep as is (could be other country)
  if (cleaned.length === 12) {
    return cleaned;
  }
  // Fallback: return cleaned number (might be malformed)
  return cleaned;
};

export const createWhatsAppUrl = (number, message) => {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return "";
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
};
