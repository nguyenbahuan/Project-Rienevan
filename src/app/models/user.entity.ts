import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  PrimaryColumn,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import bcryptjs from "bcryptjs";
import { Roles } from "./role.entity";
import { type } from "os";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  @ManyToOne(() => Roles, (role) => role.user, { eager: true, nullable: false })
  @JoinColumn({
    name: "roleId",
    referencedColumnName: "id",
  })
  // @BeforeInsert()
  // setDefaultValues() {
  //   if (!this.role) this.role = Roles.;
  // }
  role: Roles;
}
