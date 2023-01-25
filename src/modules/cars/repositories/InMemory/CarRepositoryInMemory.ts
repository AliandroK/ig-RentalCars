import { ICarDTO } from "@modules/cars/dto/CarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarReposiroty";

class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    license_plate,
    brand,
    fine_amount,
    daily_rate,
    category_id,
  }: ICarDTO): Promise<void> {
    const newCar = new Car();

    Object.assign(newCar, {
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    });

    this.cars.push(newCar);
  }
}

export { CarRepositoryInMemory };
