import { Handler } from "aws-lambda";
import { BotController } from "./controller/bot";
const botController = new BotController();

export const scan: Handler = () => botController.scan();
