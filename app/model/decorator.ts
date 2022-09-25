import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";

@table(`${process.env.STAGE}-bid-trace`)
export class BidTraceObject {
  @hashKey()
  chain: string;

  @rangeKey()
  block_hash: string;

  @attribute()
  value: string;

  @attribute()
  builder_pubkey: string;

  @attribute()
  proposer_pubkey: string;

  @attribute()
  proposer_fee_recipient: string;
}
