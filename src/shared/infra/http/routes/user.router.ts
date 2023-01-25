import { Router } from "express";
import multer from "multer";

import upload from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/user/UseCases/CreateUser/CreateUserController";
import { UploadAvatarUserController } from "../../../../modules/user/UseCases/UploadAvatarUser/UploadAvatarUserController";
import ensureAuthentication from "../middlewares/ensureAuthentication";

const userRouter = Router();

const uploadAvatar = multer(upload.upload("./temp/avatar"));

const createUserController = new CreateUserController();
const uploadAvatarUserController = new UploadAvatarUserController();

userRouter.post("/", createUserController.handle);

userRouter.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  uploadAvatarUserController.handle
);

export { userRouter };
