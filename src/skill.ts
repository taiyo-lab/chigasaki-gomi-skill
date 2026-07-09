import * as Alexa from "ask-sdk-core";
import { LaunchRequestHandler } from "./handlers/launchRequestHandler.js";
import { GetTodayGomiHandler } from "./handlers/getTodayGomiHandler.js";
import { GetTomorrowGomiHandler } from "./handlers/getTomorrowGomiHandler.js";
import { GetDateGomiHandler } from "./handlers/getDateGomiHandler.js";
import { HelpHandler } from "./handlers/helpHandler.js";
import { CancelStopHandler } from "./handlers/cancelStopHandler.js";
import { FallbackHandler } from "./handlers/fallbackHandler.js";
import { SessionEndedHandler } from "./handlers/sessionEndedHandler.js";
import { ErrorHandler } from "./handlers/errorHandler.js";

const skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetTodayGomiHandler,
    GetTomorrowGomiHandler,
    GetDateGomiHandler,
    HelpHandler,
    CancelStopHandler,
    FallbackHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .create();

export default skill;
