import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { Model } from '../../models/entities/model.entity';
import { Photo } from '../../photos/entities/photo.entity';

@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imagesUrl: string;

  @ManyToMany(() => User, user => user.events)
  users: User[];

  @OneToMany(() => Product, product => product.event)
  products: Product[];

  @OneToMany(() => Model, model => model.event)
  models: Model[];

  @OneToMany(() => Photo, photo => photo.event)
  photos: Photo[];
}
