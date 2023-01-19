import { Router } from "express";

import { categoriesRouter } from "./categories.router";
import { SpecificationRouter } from "./specifications.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", SpecificationRouter);
router.use("/user", userRouter);

export { router };
