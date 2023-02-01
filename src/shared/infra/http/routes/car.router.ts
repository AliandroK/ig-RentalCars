import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarController } from "@modules/cars/useCases/listCars/ListCarController";

import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdminUser,
  createCarController.handle
);

carRoutes.get("/available", listCarController.handle);

carRoutes.post(
  "/specifications/:car_id",
  ensureAuthentication,
  ensureAdminUser,
  createCarSpecificationController.handle
);

export { carRoutes };
