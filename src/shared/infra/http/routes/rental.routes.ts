import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/UseCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/UseCases/DevolutionRental/DevolutionRentalController";

import ensureAuthentication from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  devolutionRentalController.handle
);

export { rentalRoutes };
