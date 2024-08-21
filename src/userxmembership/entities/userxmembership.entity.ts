import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Membership } from '../../memberships/entities/membership.entity';

@Entity({ name: 'userxmembership' })  // Ensure the entity name matches your table name
export class UserMembership {
  
  @PrimaryColumn({ name: 'userid' })
  userId: number;

  @PrimaryColumn({ name: 'membershipid' })
  membershipId: number;

  @ManyToOne(() => User, (user) => user.userMemberships, { eager: true })
  @JoinColumn({ name: 'userid' })  // Join column with database column
  user: User;

  @ManyToOne(() => Membership, (membership) => membership.userMemberships, { eager: true })
  @JoinColumn({ name: 'membershipid' })  // Join column with database column
  membership: Membership;

  @Column({ name: 'expiresat', type: 'timestamp' })  // Ensure the column name and type match the database
  expiresAt: Date;
}
