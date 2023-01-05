import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const SpecificationRouter = Router();

SpecificationRouter.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { SpecificationRouter };
