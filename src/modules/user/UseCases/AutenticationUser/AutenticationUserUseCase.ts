import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IUserTokenInformation {
  user: { name: string; email: string };
  token: string;
}

@injectable()
class AutenticationUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRespository: IUserRepository
  ) {}

  async execute(
    Email: string,
    password: string
  ): Promise<IUserTokenInformation> {
    const user = await this.userRespository.findUserByEmail(Email);

    if (!user) {
      throw new AppError("Email or password is Incorrect!");
    }

    const passwordIsCorrect = await compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new AppError("Email or password is Incorrect!");
    }

    const token = sign({}, "1234567890", { subject: user.id, expiresIn: "1d" });

    const userTokenInformation: IUserTokenInformation = {
      token,
      user: {
        email: user.Email,
        name: user.name,
      },
    };

    return userTokenInformation;
  }
}

export { AutenticationUserUseCase };
