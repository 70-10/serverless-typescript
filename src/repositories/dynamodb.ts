import { DynamoDB } from "aws-sdk";

const { DocumentClient } = DynamoDB;

const isOffline = () => process.env.IS_OFFLINE;

export default isOffline()
  ? new DocumentClient({ region: "localhost", endpoint: "http://localhost:8000" })
  : new DocumentClient();
