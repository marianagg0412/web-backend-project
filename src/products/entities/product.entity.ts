import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,  // Store the value as-is
      from: (value: string) => parseFloat(value)  // Convert from string to number
    }
  })
  price: number;

  @Column({default: 'General'})
  category: string;

  @Column()
  description: string;

  @Column('int')
  stock: number;

  @Column()
  imageUrl: string;

  @Column('int', { default: 1})
  isLegal: number;

  @Column('int', {default: 1})
  isActive: number;

  @Column({ name: 'eventId', nullable: true })
  eventId: number;

  @ManyToOne(() => Event, event => event.products)
  event: Event;
}
