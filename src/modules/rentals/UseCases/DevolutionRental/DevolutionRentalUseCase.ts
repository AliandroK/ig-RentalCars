import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,

    @inject("CarsRepository")
    private carsRepository: ICarRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental not found!");
    }

    const car = await this.carsRepository.findCarById(rental.car_id);

    if (!car) {
      throw new AppError("Car not found!");
    }

    const minimumDaily = 1;
    const dateNow = this.dateProvider.datenow();

    let total: number;
    total = 0;

    if (dateNow > rental.expected_return_date) {
      const delay = this.dateProvider.compareInDays(
        rental.expected_return_date,
        dateNow
      );
      total += car.fine_amount * delay;
    }

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    if (daily <= 0) {
      daily = minimumDaily;
    }

    total += daily * car.daily_rate;

    rental.total = total;
    rental.end_date = dateNow;

    await this.rentalRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
