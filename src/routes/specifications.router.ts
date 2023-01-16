import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const SpecificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

SpecificationRouter.post("/", createSpecificationController.handle);

export { SpecificationRouter };
