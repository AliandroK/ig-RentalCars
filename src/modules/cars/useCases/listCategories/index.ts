import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const listcategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listcategoriesController = new ListCategoriesController(
  listcategoriesUseCase
);

export { listcategoriesController };
