import * as Alexa from "ask-sdk-core";

export const CancelStopHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    const requestType = Alexa.getRequestType(handlerInput.requestEnvelope);
    if (requestType !== "IntentRequest") {
      return false;
    }
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    return intentName === "AMAZON.CancelIntent" || intentName === "AMAZON.StopIntent";
  },
  handle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.responseBuilder.speak("またね。").withShouldEndSession(true).getResponse();
  },
};
