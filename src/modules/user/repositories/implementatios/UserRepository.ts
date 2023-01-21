import { Repository } from "typeorm";

import { myDataSource } from "../../../../database";
import { User } from "../../entities/user";
import { IUserDTO } from "../../userDTO/IUserDTO";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = myDataSource.getRepository(User);
  }

  async create({
    name,
    // userName,
    Email,
    password,
    driver_license,
  }: IUserDTO): Promise<void> {
    const newUser = this.userRepository.create({
      name,
      // userName,
      Email,
      password,
      driver_license,
    });

    await this.userRepository.save(newUser);
  }

  async findUserByEmail(Email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ Email });
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}

export { UserRepository };
