export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  wallet: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
