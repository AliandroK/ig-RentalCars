import { container } from "tsyringe";

import { ICategoriesRepositiry } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { UserRepository } from "../../modules/user/repositories/implementatios/UserRepository";
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
