import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  ManyToOne,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { DetailsProduct } from "./detail_productsordered.entity";
import { User } from "./user.entity";
@Entity()
export class Bills extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  status: string;

  @Column()
  oder_date: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => DetailsProduct)
  @JoinColumn()
  details: DetailsProduct;

  @ManyToOne(() => User, (user) => user.bill)
  user: User[];
}
