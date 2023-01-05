import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoriesController } from "../modules/cars/useCases/importCategories";
import { listcategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRouter = Router();

const uploadFile = multer({
  dest: "./temp",
});

categoriesRouter.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get("/", (request, response) => {
  return listcategoriesController.handle(request, response);
});

categoriesRouter.post(
  "/import",
  uploadFile.single("file"),
  (request, response) => {
    return importCategoriesController.handle(request, response);
  }
);

export { categoriesRouter };
