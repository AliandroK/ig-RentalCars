import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/UseCases/createRental/CreateRentalController";

import ensureAuthentication from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);

export { rentalRoutes };
