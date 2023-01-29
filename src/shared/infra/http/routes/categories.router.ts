import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../../../../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const categoriesRouter = Router();

const uploadFile = multer({
  dest: "./temp",
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listcategoriesController = new ListCategoriesController();

categoriesRouter.post(
  "/",
  ensureAuthentication,
  ensureAdminUser,
  createCategoryController.handle
);

categoriesRouter.get("/", listcategoriesController.handle);

categoriesRouter.post(
  "/import",
  ensureAuthentication,
  ensureAdminUser,
  uploadFile.single("file"),
  importCategoriesController.handle
);

export { categoriesRouter };
