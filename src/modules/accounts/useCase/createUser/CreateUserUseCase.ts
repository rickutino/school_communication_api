import "reflect-metadata"

import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../utils/AppError";

import { IUsersRepository } from "../../repositories/IUserRepository";
import { IStudentRepository } from "../../repositories/IStudentRepository";
import { ITransactionService } from "../../../../shared/container/services/Transaction/ITransactionService";

import { IUserDTO } from "../../dtos/IUserDTO";

export interface ICreateUserDTO extends IUserDTO {
  student_registration?: string;
  student_class?: string;
  enrollment_date?: Date;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StudentRepository")
    private studentRepository: IStudentRepository,
    @inject("TransactionService")
    private transactionService: ITransactionService,
  ) {}

  async execute({
    name,
    password,
    email,
    cpf,
    address,
    phone,
    birth_date,
    role,
    student_registration,
    student_class,
    enrollment_date,
  }: ICreateUserDTO): Promise<void> {
    if (!role) {
      throw new AppError("Role isn't defined!")
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }
    
    const passwordHash = await hash(password, 8);
    const transaction = await this.transactionService.start();
    
    try {
      const user = await this.usersRepository.create({
        name,
        password: passwordHash,
        email,
        cpf,
        address,
        phone,
        birth_date
      });

      switch (role) {
        case 'student':
          await this.studentRepository.create({
            user_id: Number(user?.id),
            student_registration: student_registration!,
            student_class: student_class!,
            enrollment_date: enrollment_date!,
          });
          break;
  
      }
      await this.transactionService.commit(transaction);
    } catch (error: any) {
      // Em caso de erro, trata e registra o erro
      await this.transactionService.rollback(transaction);
      console.error("An error occurred"+ error.message);
      throw error;
    }
  }
}

export { CreateUserUseCase };
