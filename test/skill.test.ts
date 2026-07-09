import type { RequestEnvelope } from "ask-sdk-model";
import { describe, expect, it } from "vitest";
import { handler } from "../src/index.js";

function launchRequestEnvelope(timestamp: string): RequestEnvelope {
  return {
    version: "1.0",
    session: {
      new: true,
      sessionId: "test-session",
      application: { applicationId: "test-app" },
      user: { userId: "test-user" },
    },
    context: {
      System: {
        application: { applicationId: "test-app" },
        user: { userId: "test-user" },
      },
    },
    request: {
      type: "LaunchRequest",
      requestId: "test-request",
      timestamp,
      locale: "ja-JP",
    },
  };
}

describe("Lambda handler (LaunchRequest)", () => {
  it("answers with today's category when invoked directly (Routine起動を想定)", async () => {
    // 2026-07-09 10:00 UTC = 2026-07-09 19:00 JST -> 木曜 = BURNABLE
    const response = await handler(launchRequestEnvelope("2026-07-09T10:00:00Z"), {});
    expect(response.response.outputSpeech?.ssml ?? response.response.outputSpeech?.text).toContain(
      "燃やせるごみ",
    );
    expect(response.response.shouldEndSession).toBe(true);
  });
});
