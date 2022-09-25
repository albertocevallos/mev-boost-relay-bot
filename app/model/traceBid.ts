import AWS from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { String } from "aws-sdk/clients/acm";
import { v4 as uuid } from "uuid";

AWS.config.update({ region: "us-east-1" });

export const dynamodb = new AWS.DynamoDB.DocumentClient();

export function getDataMapper(): DataMapper {
  let client: AWS.DynamoDB;
  client = new AWS.DynamoDB();
  return new DataMapper({ client });
}
export const uid = uuid();

export const get = async (queryParams: any) => {
  return await dynamodb.get(queryParams).promise();
};

export const put = async (putParams: any) => {
  return await dynamodb.put(putParams).promise();
};
