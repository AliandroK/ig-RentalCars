// DTO - Data transfer object

import { Category } from "../model/category";

interface ICategoryRepositoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepositiry {
  findbyname(name: string): Category;
  create({ name, description }: ICategoryRepositoryDTO): void;
  list(): Category[];
}

export { ICategoriesRepositiry, ICategoryRepositoryDTO };
