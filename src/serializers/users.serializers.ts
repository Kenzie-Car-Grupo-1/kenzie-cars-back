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

export const UpdateAddressSerializers: any = yup.object().shape({
  street: yup.string().notRequired(),
  number: yup.string().notRequired(),
  cep: yup.string().notRequired(),
  city: yup.string().notRequired(),
  state: yup.string().notRequired(),
  complement: yup.string().notRequired(),
});

export const UpdateUserSerializer: any = yup.object().shape({
  firstname: yup.string().notRequired(),
  lastname: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  cpf: yup.string().notRequired(),
  contact: yup.string().notRequired(),
  isWhatsapp: yup.boolean().notRequired(),
  birthdate: yup.string().notRequired(),
  description: yup.string().notRequired(),
  isSalesman: yup.boolean().notRequired(),
});
