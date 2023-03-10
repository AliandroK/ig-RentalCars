import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepositiry } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepositiry
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepository.findbyname(name);

    if (categoryAlreadyExist) {
      throw new AppError("Category already exists!");
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
