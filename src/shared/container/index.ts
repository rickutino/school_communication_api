import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository";
import UsersRepository from "../../modules/accounts/infra/knex/repositories/UserRepository";



container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
