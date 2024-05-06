import { CreateUserUseCase } from "../../../../../modules/accounts/useCase/createUser/CreateUserUseCase";
import { IUserDTO } from "../../../../../modules/accounts/dtos/IUserDTO";
import { AuthenticateUserUseCase } from "../../../../../modules/accounts/useCase/authenticateUser/AuthenticateUseCase";
import { UsersRepositoryInMemory } from "../../in-memory/UsersRepositoryInMemory";
import { AppError } from "../../../../../utils/AppError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: IUserDTO = {
      name: "Gabu",
      password: "1234pass",
      email: "test@gmail.com",
      cpf: "777-444-727-22",
      address: "any_address",
      phone: "080-0000-1111",
      birth_date: new Date("19-11-1990")
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: IUserDTO = {
      name: "Gabu",
      password: "1234pass",
      email: "test@gmail.com",
      cpf: "777-444-727-22",
      address: "any_address",
      phone: "080-0000-1111",
      birth_date: new Date("19-11-1990")
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "1234",
      })
      ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });

  it("should not be able to authenticate with incorrect email", async () => {
    const user: IUserDTO = {
      name: "Gabu",
      password: "1234pass",
      email: "test@gmail.com",
      cpf: "777-444-727-22",
      address: "any_address",
      phone: "080-0000-1111",
      birth_date: new Date("19-11-1990")
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "error@email.com",
        password: user.password,
      })
      ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });
});
