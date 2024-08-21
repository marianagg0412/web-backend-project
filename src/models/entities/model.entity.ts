import { EventModel } from 'src/eventxmodel/entities/eventxmodel.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => EventModel, (eventModel) => eventModel.model)
  eventModels: EventModel[];

  @OneToMany(() => Photo, (photo) => photo.model)
  photos: Photo[];
}
