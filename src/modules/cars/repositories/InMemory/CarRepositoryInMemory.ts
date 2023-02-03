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
    id,
    specifications,
  }: ICarDTO): Promise<Car> {
    let newCar;
    if (id) {
      newCar = this.findCarById(id);
      newCar = this.cars.splice(this.cars.indexOf(newCar, 0), 1);

      Object.assign(newCar, {
        specification: specifications,
      });

      console.log(newCar);
    } else {
      newCar = new Car();

      Object.assign(newCar, {
        name,
        description,
        license_plate,
        brand,
        fine_amount,
        daily_rate,
        category_id,
        specification: specifications,
      });
    }

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

  async findCarById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }
}

export { CarRepositoryInMemory };
