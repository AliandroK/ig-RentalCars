import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarController } from "@modules/cars/useCases/listCars/ListCarController";

import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();

carRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdminUser,
  createCarController.handle
);

carRoutes.get("/available", listCarController.handle);

export { carRoutes };
