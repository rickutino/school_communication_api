import { IUserDTO } from "../dtos/IUserDTO";

interface IUsersRepository {
  create(userData: IUserDTO): Promise<IUserDTO | undefined>;
  findByEmail(email: string): Promise<IUserDTO | undefined>;
}

export { IUsersRepository };
