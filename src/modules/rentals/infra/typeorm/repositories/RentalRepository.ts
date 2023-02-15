import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { myDataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalRepository {
  private rentalsRepository: Repository<Rental>;

  constructor() {
    this.rentalsRepository = myDataSource.getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.rentalsRepository.save(rental);

    return rental;
  }

  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentalsRepository.findOneBy({ car_id });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentalsRepository.findOneBy({ user_id });
  }
}

export { RentalRepository };
