import { User } from "../infra/typeorm/entities/user";
import { IUserDTO } from "../userDTO/IUserDTO";

interface IUserRepository {
  create(data: IUserDTO): Promise<void>;
  findUserByEmail(Email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
}

export { IUserRepository };
