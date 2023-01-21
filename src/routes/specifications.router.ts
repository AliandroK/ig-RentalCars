import { Router } from "express";

import ensureAuthentication from "../middlewares/ensureAuthentication";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const SpecificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

SpecificationRouter.use(ensureAuthentication);
SpecificationRouter.post("/", createSpecificationController.handle);

export { SpecificationRouter };
