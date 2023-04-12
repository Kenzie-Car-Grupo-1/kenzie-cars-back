import * as yup from "yup";

export const CreateCarsAdSerializer: any = yup.object().shape({
  id: yup.string().notRequired(),
  brand: yup.string().required(),
  model: yup.string().required(),
  year: yup.string().required(),
  fuel_type: yup.string().required(),
  kms: yup.number().required(),
  color: yup.string().required(),
  price: yup.string().required(),
  description: yup.string().required(),
});
