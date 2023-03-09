import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/UseCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/UseCases/DevolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/UseCases/ListRentalByUser/ListRentalByUserController";

import ensureAuthentication from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalByUserController();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  devolutionRentalController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthentication,
  listRentalsByUserController.handle
);

export { rentalRoutes };
