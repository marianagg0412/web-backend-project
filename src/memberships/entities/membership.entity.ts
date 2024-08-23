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

  @Column('decimal')
  price: number;

  @Column()
  exclusivecontenturl: string;

  // Many-to-Many relationship with User
  @ManyToMany(() => User, user => user.memberships)
  users: User[];
}
