import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  OneToMany,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import slugify from "slugify";
import { Products } from "./products.entity";
@Entity()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => Products, (product) => product.categories)
  product: Products[];

  @BeforeUpdate()
  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, {
      replacement: "-",
      lower: true,
      locale: "vi",
      trim: true,
    });
  }
}
