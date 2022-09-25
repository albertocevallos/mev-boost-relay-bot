import { MessageUtil } from "../utils/message";
import { BotService } from "../service/bot";

export class BotController extends BotService {
  /**
   * Tweet out blocks with large rewards from mev-boost relays
   */
  async scan() {
    try {
      const result = await this.findLargeRewards();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}
