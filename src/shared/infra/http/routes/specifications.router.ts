import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const SpecificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

SpecificationRouter.post(
  "/",
  ensureAuthentication,
  ensureAdminUser,
  createSpecificationController.handle
);

export { SpecificationRouter };
