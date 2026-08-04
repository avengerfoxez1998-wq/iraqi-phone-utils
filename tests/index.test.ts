import { describe, expect, it } from "vitest";

import {
  formatIraqiPhoneNumber,
  isValidIraqiMobileNumber,
  maskIraqiPhoneNumber,
  normalizeIraqiPhoneNumber,
  toInternationalFormat,
  toLocalFormat,
} from "../src/index.js";

describe("normalizeIraqiPhoneNumber", () => {
  it("normalizes local Iraqi mobile numbers", () => {
    expect(normalizeIraqiPhoneNumber("07712345678")).toBe("07712345678");
  });

  it("normalizes +964 format", () => {
    expect(normalizeIraqiPhoneNumber("+9647712345678")).toBe("07712345678");
  });

  it("normalizes 00964 format", () => {
    expect(normalizeIraqiPhoneNumber("009647712345678")).toBe("07712345678");
  });

  it("normalizes 964 format", () => {
    expect(normalizeIraqiPhoneNumber("9647712345678")).toBe("07712345678");
  });

  it("removes common separators", () => {
    expect(normalizeIraqiPhoneNumber("+964 771 234 5678")).toBe(
      "07712345678",
    );
  });

  it("rejects invalid numbers", () => {
    expect(() => normalizeIraqiPhoneNumber("12345")).toThrow(
      "Invalid Iraqi mobile phone number.",
    );
  });
});

describe("validation and formatting", () => {
  it("validates supported formats", () => {
    expect(isValidIraqiMobileNumber("07712345678")).toBe(true);
    expect(isValidIraqiMobileNumber("+9647712345678")).toBe(true);
  });

  it("rejects unsupported values", () => {
    expect(isValidIraqiMobileNumber("12345")).toBe(false);
    expect(isValidIraqiMobileNumber(null)).toBe(false);
  });

  it("formats to local format", () => {
    expect(toLocalFormat("+9647712345678")).toBe("07712345678");
  });

  it("formats to international format", () => {
    expect(toInternationalFormat("07712345678")).toBe("+9647712345678");
  });

  it("formats using the selected format", () => {
    expect(
      formatIraqiPhoneNumber("07712345678", "international"),
    ).toBe("+9647712345678");
  });

  it("masks the middle digits", () => {
    expect(maskIraqiPhoneNumber("07712345678")).toBe("0771***5678");
  });
});
