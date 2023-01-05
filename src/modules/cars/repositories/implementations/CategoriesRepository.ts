import { Category } from "../../model/category";
import {
  ICategoriesRepositiry,
  ICategoryRepositoryDTO,
} from "../ICategoriesRepository";

class CategoryRepository implements ICategoriesRepositiry {
  private categories: Category[];

  // singleton
  private static INSTANCE: CategoryRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository();
    }

    return CategoryRepository.INSTANCE;
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
