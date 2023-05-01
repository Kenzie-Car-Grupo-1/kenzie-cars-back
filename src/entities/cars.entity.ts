import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { CarImage } from "./carImages.entity";
import { Users } from "./user.entity";
import { Comment } from "./comment.entity";

@Entity("cars")
export class CarAd {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  brand: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  model: string;

  @Column({ type: "varchar", length: 4, nullable: false })
  year: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  fuel_type: string;

  @Column({ type: "int", nullable: false })
  kms: number;

  @Column({ type: "varchar", length: 10, nullable: false })
  color: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  price: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @OneToMany(() => CarImage, (carImage) => carImage.car, {
    nullable: true,
  })
  images: CarImage[];

  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.car)
  comment: Comment[];
}
