import { Repository } from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
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
    id,
    end_date,
    total = 0,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.rentalsRepository.save(rental);

    return rental;
  }

  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentalsRepository.findOne({
      where: { car_id, end_date: null },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentalsRepository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.rentalsRepository.findOneBy({ id });
  }

  async findRentalsByUser(user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
}

export { RentalRepository };
