import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserMembership } from '../../userxmembership/entities/userxmembership.entity';

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

  @OneToMany(() => UserMembership, (userMembership) => userMembership.membership)
  userMemberships: UserMembership[];
}
