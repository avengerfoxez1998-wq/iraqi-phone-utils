/**
 * Iraqi phone number utilities.
 *
 * Supported examples:
 * - 07712345678
 * - +9647712345678
 * - 009647712345678
 * - 9647712345678
 *
 * Local format:
 * - 07XXXXXXXXX
 *
 * International format:
 * - +9647XXXXXXXXX
 */

export type IraqiPhoneFormat = "local" | "international";

const LOCAL_MOBILE_PATTERN = /^07\d{9}$/;
const INTERNATIONAL_MOBILE_PATTERN = /^\+9647\d{9}$/;

/**
 * Removes common separators while preserving a leading plus sign.
 */
function sanitizePhoneNumber(value: string): string {
  return value
    .trim()
    .replace(/[\s\-().]/g, "");
}

/**
 * Converts supported Iraqi mobile-number inputs to local format.
 *
 * @example
 * normalizeIraqiPhoneNumber("+9647712345678")
 * // "07712345678"
 *
 * @throws TypeError when the input is not a string.
 * @throws Error when the number is not a valid Iraqi mobile number.
 */
export function normalizeIraqiPhoneNumber(value: string): string {
  if (typeof value !== "string") {
    throw new TypeError("Phone number must be a string.");
  }

  let phoneNumber = sanitizePhoneNumber(value);

  if (phoneNumber.startsWith("00964")) {
    phoneNumber = phoneNumber.slice(5);
  } else if (phoneNumber.startsWith("+964")) {
    phoneNumber = phoneNumber.slice(4);
  } else if (phoneNumber.startsWith("964")) {
    phoneNumber = phoneNumber.slice(3);
  }

  if (phoneNumber.startsWith("7")) {
    phoneNumber = `0${phoneNumber}`;
  }

  if (!LOCAL_MOBILE_PATTERN.test(phoneNumber)) {
    throw new Error("Invalid Iraqi mobile phone number.");
  }

  return phoneNumber;
}

/**
 * Returns true when the input can be normalized as an Iraqi mobile number.
 */
export function isValidIraqiMobileNumber(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    normalizeIraqiPhoneNumber(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Converts an Iraqi mobile number to local format.
 *
 * @example
 * toLocalFormat("+9647712345678")
 * // "07712345678"
 */
export function toLocalFormat(value: string): string {
  return normalizeIraqiPhoneNumber(value);
}

/**
 * Converts an Iraqi mobile number to international E.164-style format.
 *
 * @example
 * toInternationalFormat("07712345678")
 * // "+9647712345678"
 */
export function toInternationalFormat(value: string): string {
  const localNumber = normalizeIraqiPhoneNumber(value);
  const internationalNumber = `+964${localNumber.slice(1)}`;

  if (!INTERNATIONAL_MOBILE_PATTERN.test(internationalNumber)) {
    throw new Error("Unable to format Iraqi mobile phone number.");
  }

  return internationalNumber;
}

/**
 * Formats an Iraqi mobile number using the selected output format.
 */
export function formatIraqiPhoneNumber(
  value: string,
  format: IraqiPhoneFormat = "local",
): string {
  if (format === "local") {
    return toLocalFormat(value);
  }

  if (format === "international") {
    return toInternationalFormat(value);
  }

  throw new Error(`Unsupported phone-number format: ${String(format)}`);
}

/**
 * Masks the middle digits of an Iraqi mobile number.
 *
 * @example
 * maskIraqiPhoneNumber("07712345678")
 * // "0771***5678"
 */
export function maskIraqiPhoneNumber(value: string): string {
  const localNumber = normalizeIraqiPhoneNumber(value);

  return `${localNumber.slice(0, 4)}***${localNumber.slice(-4)}`;
}
