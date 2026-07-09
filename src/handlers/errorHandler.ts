import * as Alexa from "ask-sdk-core";

export const ErrorHandler: Alexa.ErrorHandler = {
  canHandle(): boolean {
    return true;
  },
  handle(handlerInput: Alexa.HandlerInput, error: Error) {
    console.error(`~~~~ Error handled: ${error.stack ?? error.message}`);
    return handlerInput.responseBuilder
      .speak("すみません、うまく聞き取れませんでした。もう一度お願いします。")
      .reprompt("もう一度お願いします。")
      .withShouldEndSession(false)
      .getResponse();
  },
};
