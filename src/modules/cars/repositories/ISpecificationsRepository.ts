import { Specification } from "../entities/specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ISpecificationDTO): void;
  findbyname(name: string): Specification;
}

export { ISpecificationRepository, ISpecificationDTO };
