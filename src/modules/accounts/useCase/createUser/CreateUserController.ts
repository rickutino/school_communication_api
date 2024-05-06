import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { IUserDTO } from "../../dtos/IUserDTO";
import { container } from "tsyringe";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userData: IUserDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(userData);

    return response.status(201).send();
  }
}

export { CreateUserController };
