import { Specification } from "../infra/typeorm/entities/specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ISpecificationDTO): Promise<void>;
  findbyname(name: string): Promise<Specification>;
}

export { ISpecificationRepository, ISpecificationDTO };
