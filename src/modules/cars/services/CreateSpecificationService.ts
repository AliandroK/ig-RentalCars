import { ISpecificationRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private SpecificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.SpecificationsRepository.findbyname(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already Exists!");
    }

    this.SpecificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
