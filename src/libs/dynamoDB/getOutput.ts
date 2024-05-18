import getDynamoDBClient from "@/libs/dynamoDB/client";
import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

async function getScanCommandOutputFromDynamoDB(params: ScanCommandInput) {
  const client = getDynamoDBClient();

  const command = new ScanCommand(params);
  const data = await client.send(command);

  while (data.LastEvaluatedKey) {
    const newParams = params;
    newParams.ExclusiveStartKey = data.LastEvaluatedKey;
    const tempcommand = new ScanCommand(newParams);
    // eslint-disable-next-line no-await-in-loop
    const tempdata = await client.send(tempcommand);
    data.Items = data.Items?.concat(tempdata.Items ?? []);
    data.LastEvaluatedKey = tempdata.LastEvaluatedKey;
  }

  return data;
}

async function getQueryCommandOutputFromDynamoDB(params: QueryCommandInput) {
  const client = getDynamoDBClient();

  const command = new QueryCommand(params);
  const data = await client.send(command);
  return data;
}

async function getItemCommandOutputFromDynamoDB(params: GetItemCommandInput) {
  const client = getDynamoDBClient();

  const command = new GetItemCommand(params);
  const data = await client.send(command);
  return data;
}

async function putItemCommandOutputFromDynamoDB(params: PutItemCommandInput) {
  const client = getDynamoDBClient();

  const command = new PutItemCommand(params);
  const data = await client.send(command);
  return data;
}

async function patchItemCommandOutputFromDynamoDB(
  params: UpdateItemCommandInput,
) {
  const client = getDynamoDBClient();

  const command = new UpdateItemCommand(params);
  const data = await client.send(command);
  return data;
}

async function deleteItemCommandOutputFromDynamoDB(
  params: DeleteItemCommandInput,
) {
  const client = getDynamoDBClient();

  const command = new DeleteItemCommand(params);
  const data = await client.send(command);
  return data;
}

export {
  deleteItemCommandOutputFromDynamoDB,
  getItemCommandOutputFromDynamoDB,
  getQueryCommandOutputFromDynamoDB,
  getScanCommandOutputFromDynamoDB,
  patchItemCommandOutputFromDynamoDB,
  putItemCommandOutputFromDynamoDB,
};
