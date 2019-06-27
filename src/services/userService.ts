import { injectable, inject } from "inversify";
import { User } from "../models/user";
import { UserRepository } from "../repositories/userRepository";

@injectable()
export class UserService {
  constructor(@inject("UserRepository") private userRepository: UserRepository) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findById(id);
  }

  public async createAsync(user: User) {
    return await this.userRepository.create(user);
  }
}
