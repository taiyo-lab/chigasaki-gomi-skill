import * as Alexa from "ask-sdk-core";
import { findCategory } from "../lib/calendar.js";
import { getJstDateString } from "../lib/dateUtil.js";
import { buildAnswer } from "../lib/speech.js";

// Alexaアプリの Routine(音声トリガー/スケジュールトリガー)から呼ばれる主経路。
// Routineの「スキル」アクションはLaunchRequestしか発火できないため、
// ここで直接「今日のゴミ」を答える。
export const LaunchRequestHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const todayIso = getJstDateString(0);
    const category = findCategory(todayIso);
    const speech = buildAnswer("今日", category);
    return handlerInput.responseBuilder.speak(speech).withShouldEndSession(true).getResponse();
  },
};
