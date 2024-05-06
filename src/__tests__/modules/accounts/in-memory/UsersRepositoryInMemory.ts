import { IUserDTO } from "../../../../modules/accounts/dtos/IUserDTO";
import User from "../../../../modules/accounts/infra/knex/entities/User";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUserRepository";


class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    cpf,
    address,
    phone,
    birth_date
  }: IUserDTO): Promise<void> {
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
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user!.email === email);
  }
}

export { UsersRepositoryInMemory };
