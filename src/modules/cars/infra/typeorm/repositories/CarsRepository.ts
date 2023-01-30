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

  async findAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const query = this.carsRepository
      .createQueryBuilder("car")
      .where(" available = :available", { available: true });

    if (brand) {
      query.andWhere(" brand = :brand ", { brand });
    }

    if (name) {
      query.andWhere("name = :name", { name });
    }

    if (category_id) {
      query.andWhere("category_id = :categoryid", { categoryid: category_id });
    }

    const cars = await query.getMany();

    return cars;
  }

  async findCarById(car_id: string): Promise<Car> {
    const car = await this.carsRepository.findOneBy({ id: car_id });

    return car;
  }
}

export { CarsRepository };
