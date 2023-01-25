import { Repository } from "typeorm";

import { myDataSource } from "@shared/infra/typeorm";

import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUserDTO } from "../../../userDTO/IUserDTO";
import { User } from "../entities/user";

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
    avatar,
    id,
  }: IUserDTO): Promise<void> {
    const newUser = this.userRepository.create({
      name,
      // userName,
      Email,
      password,
      driver_license,
      avatar,
      id,
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
