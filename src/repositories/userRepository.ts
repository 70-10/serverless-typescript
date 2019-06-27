import { injectable } from "inversify";
import { User } from "../models/user";
import { Repository } from "./repository";
import { TableName } from "../constants";

@injectable()
export class UserRepository extends Repository<User> {
  constructor() {
    super(TableName.User);
  }
}
