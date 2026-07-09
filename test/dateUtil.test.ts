import { describe, expect, it } from "vitest";
import { formatForSpeech, getJstDateString, isResolvedSingleDate } from "../src/lib/dateUtil.js";

describe("getJstDateString", () => {
  it("returns the JST date for a UTC time before JST midnight rollover", () => {
    // 2026-07-09 15:30 UTC = 2026-07-10 00:30 JST
    const now = new Date("2026-07-09T15:30:00Z");
    expect(getJstDateString(0, now)).toBe("2026-07-10");
  });

  it("returns the JST date for a UTC time still on the same JST day", () => {
    // 2026-07-09 10:00 UTC = 2026-07-09 19:00 JST
    const now = new Date("2026-07-09T10:00:00Z");
    expect(getJstDateString(0, now)).toBe("2026-07-09");
  });

  it("applies a positive day offset", () => {
    const now = new Date("2026-07-09T10:00:00Z");
    expect(getJstDateString(1, now)).toBe("2026-07-10");
  });

  it("rolls over month boundaries", () => {
    const now = new Date("2026-04-30T10:00:00Z");
    expect(getJstDateString(1, now)).toBe("2026-05-01");
  });
});

describe("formatForSpeech", () => {
  it("formats an ISO date into a spoken Japanese date", () => {
    expect(formatForSpeech("2026-07-10")).toBe("7月10日");
  });
});

describe("isResolvedSingleDate", () => {
  it("accepts a full ISO date", () => {
    expect(isResolvedSingleDate("2026-07-10")).toBe(true);
  });

  it("rejects ambiguous AMAZON.DATE resolutions", () => {
    expect(isResolvedSingleDate("2026-07")).toBe(false);
    expect(isResolvedSingleDate("2026-W28")).toBe(false);
  });
});
