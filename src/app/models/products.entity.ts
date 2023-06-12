import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Categories } from "./categories.entity";
import { DetailsProduct } from "./detail_productsordered.entity";
@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amout: number;

  @Column()
  img: string;

  @Column()
  size: number;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  desciption: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Categories, (category) => category.product, {
    onUpdate: "CASCADE",
  })
  categories: Categories;

  @OneToMany(() => DetailsProduct, (detailsProduct) => detailsProduct.product)
  details: DetailsProduct[];
}
