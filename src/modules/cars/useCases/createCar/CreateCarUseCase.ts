import { inject, injectable } from "tsyringe";

import { ICarDTO } from "@modules/cars/dto/CarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({
    name,
    description,
    license_plate,
    brand,
    fine_amount,
    daily_rate,
    category_id,
  }: ICarDTO): Promise<Car> {
    const plateAlreadyExists = await this.carRepository.findByLicensePlate(
      license_plate
    );

    if (plateAlreadyExists) {
      throw new AppError("Already exists a Car with the same license plate!");
    }

    const newCar = await this.carRepository.create({
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    });

    return newCar;
  }
}

export { CreateCarUseCase };
