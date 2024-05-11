import { IUsersRepository } from 'src/modules/accounts/repositories/IUserRepository';
import { connection as knex } from '../../../../../shared/infra/knex';
import { IUserDTO } from '../../../dtos/IUserDTO';

class UserRepository implements IUsersRepository{
  async create(userData: IUserDTO): Promise<IUserDTO | undefined> {
    try {
      const [createdUser] = await knex('users').insert(userData).returning('*');
      return createdUser;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return undefined;
    }
  }

  async findByEmail(email: string): Promise<IUserDTO | undefined> {
    try {
      const user = await knex("users").where({ email }).first();
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      return undefined;
    }
  }
}

export default UserRepository;