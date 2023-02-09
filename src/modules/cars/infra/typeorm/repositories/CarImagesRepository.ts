import { Repository } from "typeorm";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { myDataSource } from "@shared/infra/typeorm";

import { CarImages } from "../entities/CarImages";

class CarImagesRepository implements ICarImagesRepository {
  private carImagesRepository: Repository<CarImages>;

  constructor() {
    this.carImagesRepository = myDataSource.getRepository(CarImages);
  }

  async create(car_id: string, imageName: string): Promise<void> {
    const carImage = this.carImagesRepository.create({
      car_id,
      image_name: imageName,
    });

    await this.carImagesRepository.save(carImage);
  }
}

export { CarImagesRepository };
