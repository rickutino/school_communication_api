interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  address: string;
  avatar?: string | null;
  password_hash: string;
  phone: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
}

export default User;