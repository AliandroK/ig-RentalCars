import { Router } from "express";

import { AutenticationUserController } from "../modules/user/UseCases/AutenticationUser/AutenticationUserController";

const autenticationUserRouter = Router();

const autenticationUserController = new AutenticationUserController();

autenticationUserRouter.post(
  "/autentication",
  autenticationUserController.handle
);

export { autenticationUserRouter };
