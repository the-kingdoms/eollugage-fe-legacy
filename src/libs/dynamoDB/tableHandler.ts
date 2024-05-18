/* eslint-disable */
// TODO: Remove eslint-disable

import { QueryCommandInput, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import {
  deleteItemCommandOutputFromDynamoDB,
  getItemCommandOutputFromDynamoDB,
  getQueryCommandOutputFromDynamoDB,
  getScanCommandOutputFromDynamoDB,
  patchItemCommandOutputFromDynamoDB,
  putItemCommandOutputFromDynamoDB,
} from "./getOutput";
import { parseRecord, parseRecords } from "./parse";

async function getListFromDynamoDB(table: string) {
  const params: ScanCommandInput = {
    TableName: table,
  };
  while (true) {
    try {
      const data = await getScanCommandOutputFromDynamoDB(params);
      const records = parseRecords(data);
      return records;
    } catch (error: any) {
      if (error?.name !== "ProvisionedThroughputExceededException") throw error;
      else console.log(error?.name);
    }
  }
}

async function getQueryFromDynamoDB(table: string, queryKeys: any) {
  let keyExpression = "";
  Object.keys(queryKeys).forEach(key => {
    if (keyExpression !== "") keyExpression += " AND ";
    keyExpression += `${key} = :${key}`;
  });
  const expressionAttributeValues: { [key: string]: any } = {};
  Object.keys(queryKeys).forEach(key => {
    expressionAttributeValues[`:${key}`] = queryKeys[key];
  });
  const params: QueryCommandInput = {
    TableName: table,
    KeyConditionExpression: keyExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ConsistentRead: true,
  };
  while (true) {
    try {
      const data = await getQueryCommandOutputFromDynamoDB(params);
      const records = parseRecords(data);
      return records;
    } catch (error: any) {
      if (error?.name !== "ProvisionedThroughputExceededException") throw error;
      else console.log(error?.name);
    }
  }
}

async function getFromDynamoDB(table: string, key: any) {
  const params = {
    TableName: table,
    Key: key,
  };

  while (true) {
    try {
      const data = await getItemCommandOutputFromDynamoDB(params);
      const record = parseRecord(data);
      return record;
    } catch (error: any) {
      if (error?.name !== "ProvisionedThroughputExceededException") throw error;
      else console.log(error?.name);
    }
  }
}

async function putFromDynamoDB(table: string, item: any) {
  const params = {
    TableName: table,
    Item: marshall(item),
  };
  while (true) {
    try {
      return await putItemCommandOutputFromDynamoDB(params);
    } catch (error: any) {
      if (error?.name !== "ProvisionedThroughputExceededException") throw error;
      else console.log(error?.name);
    }
  }
}

async function patchFromDynamoDB(table: string, key: any, updates: any) {
  const params = {
    TableName: table,
    Key: key,
    AttributeUpdates: updates,
  };
  while (true) {
    try {
      return await patchItemCommandOutputFromDynamoDB(params);
    } catch (error: any) {
      if (error?.name !== "ProvisionedThroughputExceededException") throw error;
      else console.log(error?.name);
    }
  }
}

async function deleteFromDynamoDB(table: string, key: any) {
  const params = {
    TableName: table,
    Key: key,
  };
  while (true) {
    try {
      return await deleteItemCommandOutputFromDynamoDB(params);
    } catch (error: any) {
      if (error?.name !== "ProvisionedThroughputExceededException") throw error;
      else console.log(error?.name);
    }
  }
}

export {
  deleteFromDynamoDB,
  getFromDynamoDB,
  getListFromDynamoDB,
  getQueryFromDynamoDB,
  patchFromDynamoDB,
  putFromDynamoDB,
};
