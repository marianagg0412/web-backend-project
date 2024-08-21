import { EventProduct } from "src/eventxproduct/entities/eventxproduct.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product' })
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

    @OneToMany(() => EventProduct, (eventProduct) => eventProduct.product)
    eventProducts: EventProduct[];
}
