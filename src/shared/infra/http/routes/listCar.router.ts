import { Router } from "express";

import { ListCarController } from "@modules/cars/useCases/listCars/ListCarController";

const listCarRoutes = Router();

const listCarController = new ListCarController();

export { listCarRoutes };
