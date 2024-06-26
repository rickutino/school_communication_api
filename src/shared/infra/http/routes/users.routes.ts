import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCase/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/register", createUserController.handle);

export { usersRoutes };