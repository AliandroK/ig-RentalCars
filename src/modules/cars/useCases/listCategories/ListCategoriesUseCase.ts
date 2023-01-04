import { Category } from "../../model/category";
import { CategoryRepository } from "../../repositories/CategoriesRepository";

class ListCategoriesUseCase {
  constructor(private CategoriesRepository: CategoryRepository) {}

  execute(): Category[] {
    return this.CategoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
