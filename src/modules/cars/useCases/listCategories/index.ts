import { CategoryRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = new CategoryRepository();
const listcategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listcategoriesController = new ListCategoriesController(
  listcategoriesUseCase
);

export { listcategoriesController };
