import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column('int')
  stock: number;

  @Column()
  imageUrl: string;

  @Column('int')
  isLegal: number;

  // Add ManyToOne relationship with Event
  @ManyToOne(() => Event, event => event.products)
  event: Event;
}
