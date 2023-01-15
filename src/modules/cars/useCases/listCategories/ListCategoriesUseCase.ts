import { Category } from "../../entities/category";
import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";

class ListCategoriesUseCase {
  constructor(private CategoriesRepository: CategoryRepository) {}

  execute(): Category[] {
    return this.CategoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
