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
  }: ICarDTO): Promise<Car> {
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

    return newCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (car.available === true) {
        if (category_id && category_id === car.category_id) {
          return car;
        }

        if (brand && brand === car.brand) {
          return car;
        }

        if (name && name === car.name) {
          return car;
        }

        return car;
      }
      return null;
    });
  }
}

export { CarRepositoryInMemory };
