import { Repository } from "typeorm";

import { ICarDTO } from "@modules/cars/dto/CarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";
import { myDataSource } from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarRepository {
  private carsRepository: Repository<Car>;

  constructor() {
    this.carsRepository = myDataSource.getRepository(Car);
  }

  async create({
    name,
    description,
    license_plate,
    brand,
    fine_amount,
    daily_rate,
    category_id,
  }: ICarDTO): Promise<Car> {
    const car = this.carsRepository.create({
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    });

    await this.carsRepository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.carsRepository.findOneBy({ license_plate });
  }
}

export { CarsRepository };
