import * as Alexa from "ask-sdk-core";
import { findCategory } from "../lib/calendar.js";
import { getJstDateString } from "../lib/dateUtil.js";
import { buildAnswer } from "../lib/speech.js";

export const GetTodayGomiHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "GetTodayGomiIntent"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const todayIso = getJstDateString(0);
    const category = findCategory(todayIso);
    const speech = buildAnswer("今日", category);
    return handlerInput.responseBuilder.speak(speech).withShouldEndSession(true).getResponse();
  },
};
