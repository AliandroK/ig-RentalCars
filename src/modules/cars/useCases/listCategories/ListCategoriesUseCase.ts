import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/category";
import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private CategoriesRepository: CategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.CategoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
