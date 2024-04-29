import { NextApiRequest, NextApiResponse } from "next";
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY!,
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY!,
  },
});
const tableName = "eolluga-dynamodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const id = req.query.id as string;
        const params = {
          TableName: tableName,
          Key: {
            id: { S: id },
          },
        };
        const data = await client.send(new GetItemCommand(params));
        const records = unmarshall(data.Item!);
        res.status(200).json(records);
      } catch (error: any) {
        console.log(error);
        res.status(400).json({
          message: error.message || "An error occurred during fetching data",
        });
      }
      break;
    case "POST":
      try {
        const item = req.body;
        const params: PutItemCommandInput = {
          TableName: tableName,
          Item: marshall(item),
        };
        const data = await client.send(new PutItemCommand(params));
        res.status(200);
      } catch (error: any) {
        console.log(error);
        res.status(400).json({
          message: error.message || "An error occurred during posting data",
        });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end();
}
