import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { hashSync } from "bcryptjs";
import Address from "./address.entity";
import { Date } from "./date.entity";
import { CarAd } from "./cars.entity";
import { Comment } from "./comment.entity";

@Entity("users")
export class Users extends Date {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  cpf: string;
  @Column()
  contact: string;
  @Column({ default: false })
  isWhatsapp: boolean;
  @Column()
  birthdate: string;
  @Column()
  description: string;
  @Column({ default: false })
  isSalesman: boolean;
  @OneToMany(() => Address, (address) => address.user)
  address: Address[];
  @OneToMany(() => CarAd, (car) => car.user)
  cars: CarAd[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];
  @Column({ type: "uuid", nullable: true })
  reset_token: string | null;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
