import { Category } from "../model/category";
import {
  ICategoriesRepositiry,
  ICategoryRepositoryDTO,
} from "./ICategoriesRepository";

class CategoryRepository implements ICategoriesRepositiry {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICategoryRepositoryDTO): void {
    const category = new Category();
    // object assigned funciona mesmo se a variavel for uma const
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findbyname(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }
}

export { CategoryRepository };
