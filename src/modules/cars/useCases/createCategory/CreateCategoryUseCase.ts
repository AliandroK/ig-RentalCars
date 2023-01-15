import { ICategoriesRepositiry } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepositiry) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepository.findbyname(name);

    if (categoryAlreadyExist) {
      throw new Error("Category already exists!");
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
