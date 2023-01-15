import { Specification } from "../../entities/specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private Specifications: Specification[];

  constructor() {
    this.Specifications = [];
  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.Specifications.push(specification);
  }

  findbyname(name: string): Specification {
    const specification = this.Specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationsRepository };
