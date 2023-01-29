import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdminUser,
  createCarController.handle
);

export { carRoutes };
