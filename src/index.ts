import type { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import skill from "./skill.js";

export const handler = async (
  event: RequestEnvelope,
  context: unknown,
): Promise<ResponseEnvelope> => {
  return skill.invoke(event, context);
};
