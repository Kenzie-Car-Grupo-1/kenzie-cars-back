import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Date } from "./date.entity";
import { Users } from "./user.entity";

@Entity("address")
export default class Address extends Date {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({})
  street: string;
  @Column({})
  number: string;
  @Column({})
  cep: string;
  @Column({})
  city: string;
  @Column({})
  state: string;
  @Column({})
  complement: string;
  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  user: Users;
}
