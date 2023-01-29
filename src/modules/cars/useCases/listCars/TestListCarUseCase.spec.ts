import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListCarUseCase } from "./ListCarUseCase";

describe("list available cars", () => {
  let carsRepositoryInMemory: CarRepositoryInMemory;
  let createCarUseCase: CreateCarUseCase;
  let listCarsAvailableUseCase: ListCarUseCase;

  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    listCarsAvailableUseCase = new ListCarUseCase(carsRepositoryInMemory);
  });

  it("should to be able to list all cars available", async () => {
    const car = await createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });

    const listCar = await listCarsAvailableUseCase.execute({});

    expect(listCar).toEqual([car]);
  });

  it("should tp be able to list all available cars by brand", async () => {
    const car = await createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });

    const listCar = await listCarsAvailableUseCase.execute({
      brand: car.brand,
    });

    expect(listCar).toEqual([car]);
  });

  it("should tp be able to list all available cars by name", async () => {
    const car = await createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "",
    });

    const listCar = await listCarsAvailableUseCase.execute({
      name: car.name,
    });

    expect(listCar).toEqual([car]);
  });

  it("should tp be able to list all available cars by category id", async () => {
    const car = await createCarUseCase.execute({
      name: "CarTest",
      description: "description car test",
      license_plate: "987654321",
      brand: "brandTest",
      fine_amount: 100,
      daily_rate: 500,
      category_id: "123",
    });

    const listCar = await listCarsAvailableUseCase.execute({
      category_id: car.category_id,
    });

    expect(listCar).toEqual([car]);
  });
});
