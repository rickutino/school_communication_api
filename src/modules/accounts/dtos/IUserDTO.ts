export interface IUserDTO {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  address: string;
  avatar?: string | null;
  password: string;
  phone: string;
  birth_date: Date;
  role?:'student' | 'teacher' | 'parent',
  created_at?: Date;
  updated_at?: Date;
}