import { ICarDTO } from "../dto/CarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarRepository {
  create(car: ICarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICarRepository };
