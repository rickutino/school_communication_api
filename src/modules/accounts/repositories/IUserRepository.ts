import { IUserDTO } from "../dtos/IUserDTO";
import User from "../infra/knex/entities/User";

interface IUsersRepository {
  create(userData: IUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
