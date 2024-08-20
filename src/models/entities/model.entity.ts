import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}
