import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "../../../../modules/user/infra/typeorm/repositories/UserRepository";
import { AppError } from "../../../errors/AppError";

interface IPayLoad {
  user_id: string;
}

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing!", 401); // 401, authentication error
  }

  try {
    const [, token] = authHeader.split(" ");
    const { user_id } = verify(token, "1234567890") as IPayLoad;

    console.log(token);
    const userRepository = new UserRepository();
    const user = await userRepository.findUserById(user_id);

    if (!user) {
      throw new AppError("Token invalid!", 401);
    }

    request.user = user;

    next();
  } catch {
    throw new AppError("Token is invalid!", 401);
  }
}
