import { container } from "tsyringe";

import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarReposiroty";

import { CategoryRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepositiry } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { UserRepository } from "../../modules/user/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";

container.registerSingleton<ICategoriesRepositiry>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);
