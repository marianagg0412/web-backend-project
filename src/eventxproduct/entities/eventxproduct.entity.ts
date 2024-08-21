import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'eventxproduct' })
export class EventProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.eventProducts)
  event: Event;

  @ManyToOne(() => Product, (product) => product.eventProducts)
  product: Product;
}
