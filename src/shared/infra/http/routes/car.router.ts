import { Router } from "express";
import multer from "multer";

import upload from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarController } from "@modules/cars/useCases/listCars/ListCarController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagescontroller = new UploadCarImagesController();

const uploadCarImages = multer(upload.upload("./temp/carsImages"));

carRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdminUser,
  createCarController.handle
);

carRoutes.get("/available", listCarController.handle);

carRoutes.post(
  "/specifications/:car_id",
  ensureAuthentication,
  ensureAdminUser,
  createCarSpecificationController.handle
);

carRoutes.post(
  "/images/:car_id",
  ensureAuthentication,
  ensureAdminUser,
  uploadCarImages.array("images_name"),
  uploadCarImagescontroller.handle
);

export { carRoutes };
