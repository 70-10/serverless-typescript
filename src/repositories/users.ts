import DynamoDB from "./dynamodb";
import { TableName } from "../constants";

export const findById = async (id: number) => {
  const { Item } = await DynamoDB.get({ TableName: TableName.User, Key: { id } }).promise();
  return Item;
};

export const findAll = async () => {
  const { Items } = await DynamoDB.scan({ TableName: TableName.User }).promise();
  return Items;
};
