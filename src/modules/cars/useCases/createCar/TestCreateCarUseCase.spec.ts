import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create a New Car", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not to be able to create a car with exists license plate!", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "CarTest",
        description: "description car test",
        license_plate: "987654321",
        brand: "brandTest",
        fine_amount: 100,
        daily_rate: 500,
        category_id: "",
      });

      await createCarUseCase.execute({
        name: "CarTest 2",
        description: "description car test",
        license_plate: "987654321",
        brand: "brandTest",
        fine_amount: 100,
        daily_rate: 500,
        category_id: "",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should to be able create a car with available true by default!", async () => {
    const car = await createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });

    expect(car.available).toBe(true);
  });
});
