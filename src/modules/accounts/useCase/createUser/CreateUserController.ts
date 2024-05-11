import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userDate = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(userDate);

    return response.status(201).send();
  }
}

export { CreateUserController };
