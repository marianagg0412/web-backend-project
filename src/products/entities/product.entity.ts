import { Event } from "src/events/entities/event.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column('decimal')
    price: number;

    @Column({ nullable: true })
    description: string;

    @Column()
    stock: number;

    @Column({ nullable: true })
    imageUrl: string;

    @ManyToMany(() => Event, (event) => event.products)
    events: Event[];
}
