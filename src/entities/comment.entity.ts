import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Date } from "./date.entity";
import { Users } from "./user.entity";
import { CarAd } from "./cars.entity";

@Entity("comments")
export class Comment extends Date {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  user: Users;

  @ManyToOne(() => CarAd, { onDelete: "CASCADE" })
  car: CarAd;
}
