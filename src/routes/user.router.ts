import { Router } from "express";

import { CreateUserController } from "../modules/user/UseCases/CreateUser/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle);

export { userRouter };
