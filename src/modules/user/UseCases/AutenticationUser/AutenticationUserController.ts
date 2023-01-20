import { Request, Response } from "express";
import { container } from "tsyringe";

import { AutenticationUserUseCase } from "./AutenticationUserUseCase";

class AutenticationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { Email, password } = request.body;

    const auntenticationUserUseCase = container.resolve(
      AutenticationUserUseCase
    );

    const userTokenInformation = await auntenticationUserUseCase.execute(
      Email,
      password
    );

    return response.status(201).json(userTokenInformation);
  }
}

export { AutenticationUserController };
