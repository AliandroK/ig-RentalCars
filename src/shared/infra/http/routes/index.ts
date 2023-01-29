import { Router } from "express";

import ensureAdminUser from "../middlewares/ensureAdminUser";
import ensureAuthentication from "../middlewares/ensureAuthentication";
import { autenticationUserRouter } from "./autenticationUser.router";
import { carRoutes } from "./car.router";
import { categoriesRouter } from "./categories.router";
import { SpecificationRouter } from "./specifications.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", SpecificationRouter);
router.use("/user", userRouter);
router.use("/cars", carRoutes);
router.use("/autentication", autenticationUserRouter);

export { router };
