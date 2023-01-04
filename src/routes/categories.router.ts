import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listcategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRouter = Router();

categoriesRouter.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get("/", (request, response) => {
  return listcategoriesController.handle(request, response);
});

export { categoriesRouter };
