import { ICategoriesRepositiry } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepositiry) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExist = this.categoryRepository.findbyname(name);

    if (categoryAlreadyExist) {
      throw new Error("Category already exists!");
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
