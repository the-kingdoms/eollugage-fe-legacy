import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { getDynamoDBClient } from '../network';

async function getScanCommandOutputFromDynamoDB(params: ScanCommandInput) {
  const client = getDynamoDBClient();
  let data: ScanCommandOutput;

  const command = new ScanCommand(params);
  data = await client.send(command);

  while (true) {
    if (data.LastEvaluatedKey) {
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    } else break;
    const tempcommand = new ScanCommand(params);
    const tempdata = await client.send(tempcommand);
    data.Items = data.Items?.concat(tempdata.Items ?? []);
    data.LastEvaluatedKey = tempdata.LastEvaluatedKey;
  }

  return data;
}

async function getQueryCommandOutputFromDynamoDB(params: QueryCommandInput) {
  const client = getDynamoDBClient();
  let data: QueryCommandOutput;

  const command = new QueryCommand(params);
  data = await client.send(command);
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

async function patchItemCommandOutputFromDynamoDB(params: UpdateItemCommandInput) {
  const client = getDynamoDBClient();

  const command = new UpdateItemCommand(params);
  const data = await client.send(command);
  return data;
}

async function deleteItemCommandOutputFromDynamoDB(params: DeleteItemCommandInput) {
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
