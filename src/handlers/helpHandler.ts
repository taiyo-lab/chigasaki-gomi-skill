import * as Alexa from "ask-sdk-core";

export const HelpHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speech = "「今日は何のゴミの日」または「明日は何のゴミの日」と聞いてください。";
    return handlerInput.responseBuilder.speak(speech).reprompt(speech).withShouldEndSession(false).getResponse();
  },
};
