import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Photo } from '../../photos/entities/photo.entity';
import { Event } from '../../events/entities/event.entity';

@Entity({ name: 'model' })
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  portfolioUrl: string;

  @Column()
  bookingInfo: string;

  @Column()
  photosUrl: string;

  // Add ManyToOne relationship with Event
  @ManyToOne(() => Event, event => event.models)
  event: Event;

  // Add OneToMany relationship with Photo
  @OneToMany(() => Photo, photo => photo.model)
  photos: Photo[];
}
