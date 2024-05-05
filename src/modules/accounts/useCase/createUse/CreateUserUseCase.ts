import "reflect-metadata"

import { AppError } from "../../../../utils/AppError";
import { IUserDTO } from "../../dtos/IUserDTO";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    cpf,
    address,
    phone,
    birth_date
  }: IUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      cpf,
      address,
      phone,
      birth_date
    });
  }
}

export { CreateUserUseCase };
