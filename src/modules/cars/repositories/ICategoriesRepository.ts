// DTO - Data transfer object

import { Category } from "../infra/typeorm/entities/category";

interface ICategoryRepositoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepositiry {
  findbyname(name: string): Promise<Category>;
  create({ name, description }: ICategoryRepositoryDTO): Promise<void>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepositiry, ICategoryRepositoryDTO };
