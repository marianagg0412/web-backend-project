import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Model } from '../../models/entities/model.entity';
@Entity({ name: 'eventxmodel' })
export class EventModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.eventModels)
  event: Event;

  @ManyToOne(() => Model, (model) => model.eventModels)
  model: Model;
}
