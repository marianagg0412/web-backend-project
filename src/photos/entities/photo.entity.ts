import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Model } from '../../models/entities/model.entity';

@Entity({ name: 'photo' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photoUrl: string;

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,  // Store the value as-is
      from: (value: string) => parseFloat(value)  // Convert from string to number
    }
  })
  price: number;

  @Column()
  digitalOrPhysical: string;

  @Column('int', {default: 1})
  isActive: number;

  @ManyToOne(() => Event, event => event.photos)
  event: Event;

  @ManyToOne(() => Model, model => model.photos)
  model: Model;
}
