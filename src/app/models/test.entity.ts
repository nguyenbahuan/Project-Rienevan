import { Entity, PrimaryGeneratedColumn, Column, EntitySchema } from "typeorm";

@Entity()
export class Test {
  @PrimaryGeneratedColumn("uuid")
  id: any;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
