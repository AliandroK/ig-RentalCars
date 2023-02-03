import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  private specificationsRepository: Specification[] = [];

  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specificationsRepository.push(specification);

    return specification;
  }

  async findbyname(name: string): Promise<Specification> {
    return this.specificationsRepository.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specificationsRepository.filter((spcification) =>
      ids.includes(spcification.id)
    );
  }
}

export { SpecificationRepositoryInMemory };
