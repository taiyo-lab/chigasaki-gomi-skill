import * as Alexa from "ask-sdk-core";

export const SessionEndedHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput): boolean {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest";
  },
  handle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.responseBuilder.getResponse();
  },
};
