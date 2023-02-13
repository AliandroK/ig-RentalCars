import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalRepository) {}

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

    const expectReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectReturnDateFormat).diff(dateNow, "hour");

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
