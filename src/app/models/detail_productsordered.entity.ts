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
@Entity()
export class DetailsProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amout: number;

  @ManyToOne(() => Products, (product) => product.details)
  product: Products[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
