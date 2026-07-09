import { describe, expect, it } from "vitest";
import { buildAnswer } from "../src/lib/speech.js";

describe("buildAnswer", () => {
  it("describes a normal collection day", () => {
    expect(buildAnswer("今日", "BURNABLE")).toBe("今日は燃やせるごみの日です。");
  });

  it("describes a no-collection day", () => {
    expect(buildAnswer("今日", "NONE")).toBe("今日は収集はありません。");
  });

  it("handles unknown dates gracefully", () => {
    expect(buildAnswer("今日", undefined)).toBe("今日のゴミ収集データがまだありません。");
  });
});
