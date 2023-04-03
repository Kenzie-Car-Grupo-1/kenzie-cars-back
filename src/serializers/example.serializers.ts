import * as yup from "yup";

export const ExampleSerializer: any = yup.object().shape({
  id: yup.string().notRequired(),
});
