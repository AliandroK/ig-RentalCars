import { Category } from "@modules/cars/infra/typeorm/entities/category";

import {
  ICategoriesRepositiry,
  ICategoryRepositoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepositiry {
  categoriesRepository: Category[] = [];

  async findbyname(name: string): Promise<Category> {
    return this.categoriesRepository.find((category) => category.name === name);
  }

  async create({ name, description }: ICategoryRepositoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categoriesRepository.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categoriesRepository;
  }
}

export { CategoriesRepositoryInMemory };
