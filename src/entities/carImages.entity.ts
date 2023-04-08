import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { CarAd } from "./carAd.entity";

@Entity()
export class CarImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  url: string;

  @ManyToOne(() => CarAd, (car) => car.images)
  car: CarAd;
}
