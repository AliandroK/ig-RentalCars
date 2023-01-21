import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserDTO } from "../../userDTO/IUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    Email,
    password,
    driver_license,
  }: IUserDTO): Promise<void> {
    const user = await this.userRepository.findUserByEmail(Email);

    if (user) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      Email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
