import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  OneToMany,
  BaseEntity,
} from "typeorm";
@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
