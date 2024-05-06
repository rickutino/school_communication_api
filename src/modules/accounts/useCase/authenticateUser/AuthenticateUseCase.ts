import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUserDTO } from "../../dtos/IUserDTO";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { AppError } from "../../../../utils/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user:  {
    name: string,
    email: string,
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
    ){}
    
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const { 
      expires_in_token,
      secret_token,
    } = auth;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or Password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or Password incorrect!");
    };

    // Segundo parametro gerador md5.
    const token = sign({}, secret_token, {
      subject: String(user.id),
      expiresIn: expires_in_token,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}


export { AuthenticateUserUseCase };
