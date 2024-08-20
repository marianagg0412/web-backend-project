import { Model } from "src/models/entities/model.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date')
  date: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imagesUrl: string;

  @ManyToMany(() => Model)
  @JoinTable()
  models: Model[];
}
