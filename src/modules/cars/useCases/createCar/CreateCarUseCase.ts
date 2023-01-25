import { inject, injectable } from "tsyringe";

import { ICarDTO } from "@modules/cars/dto/CarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("")
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
  }: ICarDTO): Promise<void> {
    this.carRepository.create({
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    });
  }
}

export { CreateCarUseCase };
