import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Model } from '../../models/entities/model.entity';

@Entity({ name: 'photo' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photourl: string;

  @Column('decimal')
  price: number;

  @Column()
  digitalorphysical: string;

  @ManyToOne(() => Event, (event) => event.photos)
  event: Event;

  @ManyToOne(() => Model, (model) => model.photos)
  model: Model;
}
