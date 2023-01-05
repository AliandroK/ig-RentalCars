import { Router } from "express";

import { categoriesRouter } from "./categories.router";
import { SpecificationRouter } from "./specifications.router";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", SpecificationRouter);

export { router };
