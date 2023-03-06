import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/InMemory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not to be able to add a new specification to the car that doesn`t exists", async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: "0",
        specifications_id: [],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should to be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "vidros elétricos",
      description: "Possui vidro elétrico",
    });

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(carSpecification).toHaveProperty("specification");
    expect(carSpecification.specification.length).toBe(1);
  });
});
