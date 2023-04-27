export interface ICreateAddress {
  street: string;
  number: string;
  cep: string;
  city: string;
  state: string;
  complement: string;
  user?: ICreateUserResponse | null;
}

export interface ICreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cpf: string;
  contact: string;
  isWhatsapp: boolean;
  birthdate: string;
  description: string;
  isSalesman: boolean;
  address: ICreateAddress[] | null;
}

export interface ICreateUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cpf: string;
  contact: string;
  isWhatsapp: boolean;
  birthdate: string;
  description: string;
  isSalesman: boolean;
  address: ICreateAddress[] | null;
}
