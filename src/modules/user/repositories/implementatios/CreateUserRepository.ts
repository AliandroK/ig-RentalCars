import { Repository } from "typeorm";

import { myDataSource } from "../../../../database";
import { User } from "../../entities/user";
import { IUserDTO } from "../../userDTO/IUserDTO";
import { ICreateUserRepository } from "../ICreateUserRepository";

class CreateUserRepository implements ICreateUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = myDataSource.getRepository(User);
  }

  async create({
    name,
    userName,
    Email,
    password,
    driver_license,
  }: IUserDTO): Promise<void> {
    const newUser = this.userRepository.create({
      name,
      userName,
      Email,
      password,
      driver_license,
    });

    this.userRepository.save(newUser);
  }
}

export { CreateUserRepository };
