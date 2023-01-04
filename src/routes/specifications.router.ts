import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const SpecificationRouter = Router();
const SpecificationRepository = new SpecificationsRepository();

SpecificationRouter.post("/", (request, response) => {
  const { name, description } = request.body;

  const specificationservice = new CreateSpecificationService(
    SpecificationRepository
  );

  specificationservice.execute({ name, description });

  response.status(201).send();
});

export { SpecificationRouter };
