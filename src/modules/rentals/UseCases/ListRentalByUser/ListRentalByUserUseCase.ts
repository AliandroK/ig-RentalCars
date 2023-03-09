import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findRentalsByUser(user_id);

    return rentals;
  }
}

export { ListRentalByUserUseCase };
