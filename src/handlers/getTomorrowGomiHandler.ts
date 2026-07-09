import * as Alexa from "ask-sdk-core";
import { findCategory } from "../lib/calendar.js";
import { getJstDateString } from "../lib/dateUtil.js";
import { buildAnswer } from "../lib/speech.js";

export const GetTomorrowGomiHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "GetTomorrowGomiIntent"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const tomorrowIso = getJstDateString(1);
    const category = findCategory(tomorrowIso);
    const speech = buildAnswer("明日", category);
    return handlerInput.responseBuilder.speak(speech).withShouldEndSession(true).getResponse();
  },
};
