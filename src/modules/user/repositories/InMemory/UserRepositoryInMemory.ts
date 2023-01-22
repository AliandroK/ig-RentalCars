import { User } from "../../entities/user";
import { IUserDTO } from "../../userDTO/IUserDTO";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  userRepository: User[] = [];

  async create(data: IUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.userRepository.push(user);
  }

  async findUserByEmail(Email: string): Promise<User> {
    return this.userRepository.find((user) => user.Email === Email);
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
