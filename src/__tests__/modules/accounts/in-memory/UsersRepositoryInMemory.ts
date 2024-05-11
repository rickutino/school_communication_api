import { IUserDTO } from "../../../../modules/accounts/dtos/IUserDTO";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUserRepository";


class UsersRepositoryInMemory implements IUsersRepository {
  users: IUserDTO[] = [];

  async create({
    name,
    password,
    email,
    cpf,
    address,
    phone,
    birth_date
  }: IUserDTO): Promise<IUserDTO | undefined> {
    const user: IUserDTO = {
      name,
      password,
      email,
      cpf,
      address,
      phone,
      birth_date
    }

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUserDTO | undefined> {
    return this.users.find((user) => user!.email === email);
  }
}

export { UsersRepositoryInMemory };
