import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Products } from "./products.entity";
@Entity()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Products, (product) => product.categories)
  product: Products[];
}
