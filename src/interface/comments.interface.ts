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

export interface ICarComment {
  id: string;
}

export interface ICommentResponse {
  id: string;
  text: string;
  user: IUserComment;
  car: ICarComment;
}

export interface ICommentUpdate {
  text?: string;
}
