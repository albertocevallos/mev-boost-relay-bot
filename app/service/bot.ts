import { rwClient } from "../constants/twitter.config";
import axios from "axios";
import { intersection, difference } from "../utils/array";
import { toTokenUnitsBN } from "../utils/bignumber";
import { getDataMapper, BidTraceObject } from "../model";
import { shortenAddress } from "../utils";

const LARGE_AMOUNT: number = 5e18;

export class BotService {
  protected async findLargeRewards() {
    try {
      // get data every minute
      const { data, status } = await axios.get(
        "https://boost-relay.flashbots.net/relay/v1/data/bidtraces/proposer_payload_delivered?limit=10",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("response status is: ", status);
      if (!data) return;

      // try find items in db
      const foundItems: any[] = [];
      const mapper = getDataMapper();
      const entriesToGet = data.map((item: any) =>
        Object.assign(new BidTraceObject(), {
          chain: "ethereum",
          block_hash: item.block_hash,
        })
      );
      try {
        for await (const found of mapper.batchGet(entriesToGet)) {
          foundItems.push(found);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }

      // if missing, add them and tweet
      const diff = difference(data, foundItems);
      if (!diff.length) return;
      const results: any[] = [];
      await Promise.all(
        diff.map(async (item) => {
          //add to dynamodb
          const result = await mapper.put(
            Object.assign(new BidTraceObject(), {
              chain: "ethereum",
              block_hash: item.block_hash,
              value: item.value,
              builder_pubkey: item.builder_pubkey,
              proposer_pubkey: item.proposer_pubkey,
              proposer_fee_recipient: item.proposer_fee_recipient,
              slot: item.slot,
            })
          );
          results.push(result);
          // tweet if larger than LARGE_AMOUNT
          if (item.value > LARGE_AMOUNT) {
            await rwClient.v2.tweet(
              `🚨 Reward alert: ${toTokenUnitsBN(item.value, 18).toFixed(
                2
              )} ETH \n \n  \n Slot: ${
                item.slot
              } \n Validator: ${shortenAddress(
                item.proposer_pubkey
              )} \n Builder: ${shortenAddress(
                item.builder_pubkey
              )}  \n https://beaconscan.com/slot/${item.slot} \n \n
            `
            );
          } else {
            console.log("Small reward");
          }
        })
      );

      return { newCount: diff.length, results };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        throw error;
      } else {
        console.log("unexpected error: ", error);
        throw error;
      }
    }
  }
}
