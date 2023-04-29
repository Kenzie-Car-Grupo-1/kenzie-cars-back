import { ICreateUserResponse } from "./users.interface"

export interface ICommentCreate {
    text: string,
    user: ICreateUserResponse
}

export interface ICommentUpdate {
    text?: string,
}