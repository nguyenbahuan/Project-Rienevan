import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
