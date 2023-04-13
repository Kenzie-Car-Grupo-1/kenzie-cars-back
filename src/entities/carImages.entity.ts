import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { CarAd } from "./cars.entity";

@Entity("carImage")
export class CarImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  url: string;

  @ManyToOne(() => CarAd, (cars) => cars.images, { onDelete: "CASCADE" })
  car: CarAd;
}
