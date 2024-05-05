import { IUsersRepository } from 'src/modules/accounts/repositories/IUserRepository';
import { connection as knex } from '../../../../../shared/infra/knex';
import { IUserDTO } from '../../../dtos/IUserDTO';
import User from '../entities/User';

class UserRepository implements IUsersRepository{
  async create(userData: IUserDTO): Promise<void> {
    await knex('users').insert(userData);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await knex("users").where({ email }).first();

    return user;
  }
}

export default UserRepository;