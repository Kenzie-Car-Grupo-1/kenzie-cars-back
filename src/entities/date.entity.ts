import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Date {
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
