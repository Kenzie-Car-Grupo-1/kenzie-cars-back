import * as yup from "yup";

export const CreateAddressSerializers: any = yup.object().shape({
  street: yup.string().required(),
  number: yup.string().required(),
  cep: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  complement: yup.string().required(),
});

export const CreateUserSerializer: any = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cpf: yup.string().required(),
  contact: yup.string().required(),
  isWhatsapp: yup.boolean().required(),
  birthdate: yup.string().required(),
  description: yup.string().required(),
  isSalesman: yup.boolean().required(),
  address: CreateAddressSerializers,
});

export const CreateUserSerializerWithoutPass: any = yup.object().shape({
  id: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  contact: yup.string().required(),
  isWhatsapp: yup.boolean().required(),
  birthdate: yup.string().required(),
  description: yup.string().required(),
  isSalesman: yup.boolean().required(),
  address: CreateAddressSerializers,
});

export const LoginUserSerializer: any = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
