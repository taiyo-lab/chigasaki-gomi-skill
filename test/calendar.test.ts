import { describe, expect, it } from "vitest";
import { findCategory } from "../src/lib/calendar.js";

describe("findCategory", () => {
  it("resolves a known burnable day", () => {
    expect(findCategory("2026-04-02")).toBe("BURNABLE");
  });

  it("resolves a holiday with no collection", () => {
    expect(findCategory("2026-04-29")).toBe("NONE");
  });

  it("resolves a weekend as no collection", () => {
    expect(findCategory("2026-04-04")).toBe("NONE");
  });

  it("returns undefined outside the known fiscal year range", () => {
    expect(findCategory("2025-01-01")).toBeUndefined();
  });
});
