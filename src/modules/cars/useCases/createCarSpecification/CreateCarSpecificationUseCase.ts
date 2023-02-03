import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository,

    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carsExists = await this.carsRepository.findCarById(car_id);

    if (!carsExists) {
      throw new AppError("The Car doesn`t exists!");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    const car = await this.carsRepository.create({
      category_id: carsExists.category_id,
      brand: carsExists.brand,
      daily_rate: carsExists.daily_rate,
      description: carsExists.description,
      fine_amount: carsExists.fine_amount,
      license_plate: carsExists.license_plate,
      name: carsExists.name,
      id: carsExists.id,
      specifications,
    });

    return car;
  }
}

export { CreateCarSpecificationUseCase };
