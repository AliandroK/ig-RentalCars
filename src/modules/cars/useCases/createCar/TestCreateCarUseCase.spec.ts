import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create a New Car", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it("Should be able to create a new car", () => {
    createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });
  });
});
