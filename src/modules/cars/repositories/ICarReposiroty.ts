import { ICarDTO } from "../dto/CarDTO";

interface ICarRepository {
  create(car: ICarDTO): Promise<void>;
}

export { ICarRepository };
