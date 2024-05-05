export interface IUserDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  address: string;
  phone: string;
  birth_date: string;
  avatar?: string;
  role: 'student|teacher|parent';
}