import { ICarsAdCreate } from "./carsAd.interface";
import { ICreateUserResponse } from "./users.interface";

export interface ICommentCreate {
  text: string;
  // user: ICreateUserResponse;
}

export interface IUserComment {
  id: string;
  firstname: string;
  lastname: string;
}

export interface ICommentResponse {
  id: string;
  text: string;
  user: IUserComment;
  car: string;
}

export interface ICommentUpdate {
  text?: string;
}
