import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private SpecificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.SpecificationsRepository.findbyname(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already Exists!");
    }

    await this.SpecificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
