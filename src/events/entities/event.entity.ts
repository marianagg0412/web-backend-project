import { EventModel } from "src/eventxmodel/entities/eventxmodel.entity";
import { EventProduct } from "src/eventxproduct/entities/eventxproduct.entity";
import { Photo } from "src/photos/entities/photo.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { User } from '../../users/entities/user.entity'; // Import the User entity

@Entity({ name: 'event' })
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

  @OneToMany(() => EventModel, (eventModel) => eventModel.event)
  eventModels: EventModel[];

  @OneToMany(() => EventProduct, (eventProduct) => eventProduct.event)
  eventProducts: EventProduct[];

  @OneToMany(() => Photo, (photo) => photo.event)
  photos: Photo[];

  // New Many-to-Many relationship with User
  @ManyToMany(() => User, user => user.events)
  users: User[];
}
