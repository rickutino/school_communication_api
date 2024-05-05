import { Request, Response } from 'express';
import { compare, hash } from "bcryptjs";

import auth from "../config/auth";
import { sign } from "jsonwebtoken";

import { IUserDTO } from '../utils/dtos/IUserDTO';
import { AppError } from '../utils/AppError';

const users: IUserDTO[] = [];

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { password, email, name, birth_date, phone, cpf, address, role } = req.body;

  const passwordHash = await hash(password, 8);

  const checkUserExists = users.find(u => u.email === email);
  if (checkUserExists) {
    throw new AppError("This email already exists")
  }

  const user: IUserDTO = { 
    id: users.length + 1,
    name,
    password: passwordHash,
    email,
    cpf,
    address,
    birth_date,
    phone,
    role,
  };
  users.push(user);



  return res.status(201).json(user);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const { secretToken, expiresIn } = auth.jwt;

  const user = users.find(u => u.email === email);
  if (!user) {
    throw new AppError("Email or password incorrect!", 401)
  };

  const passwordMatched = await compare(password, user.password);
  if (!passwordMatched) {
    throw new AppError("Email or password incorrect!", 401)
  };

  const token = sign({}, secretToken, {
    subject: String(user.id),
    expiresIn
  })
  return res.json({ user, token });
};

export const updateUser = (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { phone, email } = req.body;

  const user = users.find(u => u.id === parseInt(user_id));
  if (user) {
    user.phone = phone ?? user.phone;
    user.email = email ?? user.email;
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};
