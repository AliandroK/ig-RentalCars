import { Router } from "express";

import { AutenticationUserController } from "../../../../modules/user/UseCases/AutenticationUser/AutenticationUserController";

const autenticationUserRouter = Router();

const autenticationUserController = new AutenticationUserController();

autenticationUserRouter.post("/", autenticationUserController.handle);

export { autenticationUserRouter };
