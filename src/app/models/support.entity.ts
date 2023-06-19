import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    EntitySchema,
    OneToMany,
    BaseEntity,
  } from "typeorm";
  @Entity()
  export class FeedBack extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email:string;
  
    @Column()
    phoneNumber: string;
  
    @Column()
    content: string;
  
    @Column()
    created_at: Date;
  }
  