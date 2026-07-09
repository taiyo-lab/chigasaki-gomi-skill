import * as Alexa from "ask-sdk-core";
import { findCategory } from "../lib/calendar.js";
import { formatForSpeech, isResolvedSingleDate } from "../lib/dateUtil.js";
import { buildAnswer } from "../lib/speech.js";

export const GetDateGomiHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "GetDateGomiIntent"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const targetDate = Alexa.getSlotValue(handlerInput.requestEnvelope, "targetDate");

    if (!targetDate || !isResolvedSingleDate(targetDate)) {
      return handlerInput.responseBuilder
        .speak("その日付は聞き取れませんでした。もう一度、日付を言ってください。")
        .reprompt("何月何日か、もう一度言ってください。")
        .withShouldEndSession(false)
        .getResponse();
    }

    const category = findCategory(targetDate);
    const speech = buildAnswer(formatForSpeech(targetDate), category);
    return handlerInput.responseBuilder.speak(speech).withShouldEndSession(true).getResponse();
  },
};
