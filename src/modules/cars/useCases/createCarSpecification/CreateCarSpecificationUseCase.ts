import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carsExists = this.carsRepository.findCarById(car_id);

    if (!carsExists) {
      throw new AppError("The Car doesn`t exists!");
    }
  }
}

export { CreateCarSpecificationUseCase };
