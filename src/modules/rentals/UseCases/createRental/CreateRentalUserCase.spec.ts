import dayjs from "dayjs";

import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let carsRepository: CarRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepository = new CarRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepository
    );
  });

  it("Should to be able to create a new Rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123",
      car_id: "123",
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("started_date");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "123",
        car_id: "4321",
        expected_return_date: dayAdd24hours,
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "123",
        car_id: "123",
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if car is unavailable", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: dayAdd24hours,
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "4321",
        car_id: "123",
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with less than 24 hours ", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
