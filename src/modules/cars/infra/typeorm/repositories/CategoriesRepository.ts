import { Repository } from "typeorm";

import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { myDataSource } from "@shared/infra/typeorm";

import {
  ICategoriesRepositiry,
  ICategoryRepositoryDTO,
} from "../../../repositories/ICategoriesRepository";

class CategoryRepository implements ICategoriesRepositiry {
  private categoryRepository: Repository<Category>;

  // singleton
  // private static INSTANCE: CategoryRepository;

  constructor() {
    this.categoryRepository = myDataSource.getRepository(Category);
  }

  // public static getInstance(): CategoryRepository {
  //   if (!CategoryRepository.INSTANCE) {
  //     CategoryRepository.INSTANCE = new CategoryRepository();
  //   }

  //   return CategoryRepository.INSTANCE;
  // }

  async create({ name, description }: ICategoryRepositoryDTO): Promise<void> {
    // const category = new Category();
    // // object assigned funciona mesmo se a variavel for uma const
    // Object.assign(category, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });

    const category = this.categoryRepository.create({
      name,
      description,
    });

    await this.categoryRepository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findbyname(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ name });
    return category;
  }
}

export { CategoryRepository };
