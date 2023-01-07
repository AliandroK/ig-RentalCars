import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const categoriesRepositories = CategoryRepository.getInstance();
const importCategoriesUseCase = new ImportCategoriesUseCase(
  categoriesRepositories
);
const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
);

export { importCategoriesController };
