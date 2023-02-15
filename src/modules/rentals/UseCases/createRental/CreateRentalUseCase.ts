import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: IRentalRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnAvailable) {
      throw new AppError("Car is unvailable!");
    }

    const rentalOpentoUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpentoUser) {
      throw new AppError("There is a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.datenow(),
      expected_return_date
    );

    if (compare < 24) {
      throw new AppError(
        "It is not possible to create a new rental with less than 24 hours!"
      );
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
