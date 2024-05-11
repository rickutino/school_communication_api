import { container } from "tsyringe";

import "./services";
import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository";
import { IStudentRepository } from "../../modules/accounts/repositories/IStudentRepository";
import UsersRepository from "../../modules/accounts/infra/knex/repositories/UserRepository";
import StudentRepository from "../../modules/accounts/infra/knex/repositories/StudentRepository";



container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IStudentRepository>(
  "StudentRepository",
  StudentRepository
);
