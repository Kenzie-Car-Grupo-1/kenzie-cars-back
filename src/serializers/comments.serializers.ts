import * as yup from "yup";
import { CreateUserSerializerWithoutPass } from "./users.serializers";
import { CreateCarsAdResponseSerializer } from "./carsAd.serializers";
import { CreateAddressSerializers } from "./users.serializers";
import { ICommentCreate, ICommentResponse } from "../interface/comments.interface";

export const CreateCommentSerializer: yup.SchemaOf<ICommentCreate> = yup.object().shape({
  id: yup.string().notRequired(),
  text: yup.string().required(),
});

export const CreateCommentResponseSerializer: any = yup.object().shape({
  car: yup.object().shape({ id: yup.string().required() }),
  user: yup.object().shape({
    lastname: yup.string().required(),
    firstname: yup.string().required(),
    id: yup.string().required(),
  }),
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired(),
  text: yup.string().required(),
  id: yup.string().required()
});
