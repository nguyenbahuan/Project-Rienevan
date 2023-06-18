import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  OneToMany,
  BaseEntity,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Products } from "./products.entity";
import { Bills } from "./bills.entity";
@Entity()
export class DetailsProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amout: number;
  @Column()
  size: string;

  @ManyToOne(() => Products, (product) => product.details)
  product: Products;

  @ManyToOne(() => Bills, (bills) => bills.details)
  bills: Bills;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
