import { IUserDTO } from "../userDTO/IUserDTO";

interface ICreateUserRepository {
  create(data: IUserDTO): Promise<void>;
}

export { ICreateUserRepository };
