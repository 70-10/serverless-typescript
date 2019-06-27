import { injectable, unmanaged } from "inversify";
import { DynamoDB } from "aws-sdk";

@injectable()
export class Repository<T> {
  protected client: DynamoDB.DocumentClient;

  constructor(@unmanaged() private tableName: string) {
    this.client = process.env.IS_OFFLINE
      ? new DynamoDB.DocumentClient({
          region: "localhost",
          endpoint: "http://localhost:8000",
          convertEmptyValues: true,
        })
      : new DynamoDB.DocumentClient({ convertEmptyValues: true });
  }

  public async findAll(): Promise<T[]> {
    const { Items } = await this.client.scan({ TableName: this.tableName }).promise();

    if (!Items) {
      return [];
    }

    return Items as T[];
  }

  public async findById(id: number): Promise<T | undefined> {
    const { Item } = await this.client.get({ TableName: this.tableName, Key: { id } }).promise();
    if (!Item) {
      return undefined;
    }

    return Item as T;
  }

  public async create(item: T): Promise<T> {
    await this.client.put({ TableName: this.tableName, Item: item }).promise();
    return item;
  }
}
