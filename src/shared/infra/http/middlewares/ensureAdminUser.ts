import { NextFunction, Request, Response } from "express";

import { UserRepository } from "@modules/user/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

export default async function ensureAdminUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UserRepository();

  const user = await userRepository.findUserById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin to execute this process!");
  }

  next();
}
