import express from "express";

import { categoriesRouter } from "./routes/categories.router";
import { SpecificationRouter } from "./routes/specifications.router";

const app = express();

app.use(express.json());
app.use("/categories", categoriesRouter);
app.use("/specifications", SpecificationRouter);

app.listen(3333, () => {
  console.log("server is running!");
});
