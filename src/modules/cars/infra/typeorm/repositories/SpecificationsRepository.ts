import { Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { myDataSource } from "@shared/infra/typeorm";

class SpecificationsRepository implements ISpecificationRepository {
  // private Specifications: Specification[];

  private specificationRepository: Repository<Specification>;

  constructor() {
    // this.Specifications = [];
    this.specificationRepository = myDataSource.getRepository(Specification);
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    // const specification = new Specification();
    // Object.assign(specification, { name, description, created_at: new Date() });
    // this.Specifications.push(specification);
    const specification = this.specificationRepository.create({
      name,
      description,
    });

    await this.specificationRepository.save(specification);
  }

  async findbyname(name: string): Promise<Specification> {
    const specification = await this.specificationRepository.findOneBy({
      name,
    });

    return specification;
  }
}

export { SpecificationsRepository };
