import { inject, injectable } from "tsyringe";

import { Category } from "../../infra/typeorm/entities/category";
import { CategoryRepository } from "../../infra/typeorm/repositories/CategoriesRepository";

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
