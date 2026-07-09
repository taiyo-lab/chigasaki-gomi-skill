import * as Alexa from "ask-sdk-core";

export const FallbackHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speech = "よくわかりませんでした。「今日は何のゴミの日」と聞いてください。";
    return handlerInput.responseBuilder.speak(speech).reprompt(speech).withShouldEndSession(false).getResponse();
  },
};
