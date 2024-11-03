import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'membership' })
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tier: string;

  @Column()
  benefits: string;

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,  // Store the value as-is
      from: (value: string) => parseFloat(value)  // Convert from string to number
    }
  })
  price: number;

  @Column()
  exclusivecontenturl: string;

  @Column({ default: 1})
  isActive: number;

  // Many-to-Many relationship with User
  @ManyToMany(() => User, user => user.memberships)
  users: User[];
}
