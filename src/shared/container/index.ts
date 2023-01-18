import { container } from "tsyringe";

import { ICategoriesRepositiry } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { ICreateUserRepository } from "../../modules/user/repositories/ICreateUserRepository";
import { CreateUserRepository } from "../../modules/user/repositories/implementatios/CreateUserRepository";

container.registerSingleton<ICategoriesRepositiry>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<ICreateUserRepository>(
  "CreateUserRepository",
  CreateUserRepository
);
