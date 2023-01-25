import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/InMemory/UserRepositoryInMemory";
import { IUserDTO } from "../../userDTO/IUserDTO";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AutenticationUserUseCase } from "./AutenticationUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticationUserUseCase: AutenticationUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authentication User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticationUserUseCase = new AutenticationUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should to be able to Authenticated an user", async () => {
    const userInfo: IUserDTO = {
      Email: "teste@email.com",
      password: "1234",
      driver_license: "987654321",
      name: "teste",
    };

    await createUserUseCase.execute(userInfo);

    const userTokenInformation = await authenticationUserUseCase.execute(
      userInfo.Email,
      userInfo.password
    );

    expect(userTokenInformation).toHaveProperty("token");
  });

  it("Should not to be able to authenticated a user with Email that not exists", async () => {
    expect(async () => {
      const userInfo: IUserDTO = {
        Email: "teste@email.com",
        password: "1234",
        driver_license: "987654321",
        name: "teste",
      };

      await createUserUseCase.execute(userInfo);

      const userTokenInformation = await authenticationUserUseCase.execute(
        "email@incorreto.com",
        userInfo.password
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not to be able to authenticated a user with an incorrect password", () => {
    expect(async () => {
      const userInfo: IUserDTO = {
        Email: "teste@email.com",
        password: "1234",
        driver_license: "987654321",
        name: "teste",
      };

      await createUserUseCase.execute(userInfo);

      const userTokenInformation = await authenticationUserUseCase.execute(
        userInfo.Email,
        "123"
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
