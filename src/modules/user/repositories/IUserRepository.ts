import { User } from "../entities/user";
import { IUserDTO } from "../userDTO/IUserDTO";

interface IUserRepository {
  create(data: IUserDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
}

export { IUserRepository };
