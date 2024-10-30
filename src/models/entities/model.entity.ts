import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
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

  @Column({ nullable: true })
  photosUrl: string;

  @Column({ default: true }) // Add this line
  isActive: boolean;

  @ManyToMany(() => Event, event => event.models)
  events: Event[];

  // Add OneToMany relationship with Photo
  @OneToMany(() => Photo, photo => photo.model)
  photos: Photo[];
}
