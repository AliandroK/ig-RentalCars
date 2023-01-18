import { inject, injectable } from "tsyringe";

import { ICreateUserRepository } from "../../repositories/ICreateUserRepository";
import { IUserDTO } from "../../userDTO/IUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("CreateUserRepository")
    private createUserRepository: ICreateUserRepository
  ) {}

  execute(data: IUserDTO) {
    this.createUserRepository.create(data);
  }
}

export { CreateUserUseCase };
