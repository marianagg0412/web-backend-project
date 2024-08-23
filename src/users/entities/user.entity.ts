import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Event } from '../../events/entities/event.entity';
import { Membership } from '../../memberships/entities/membership.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  membershipstatus: string;

  // Assuming this is for the main role of the user
  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  // Many-to-Many relationship with Membership
  @ManyToMany(() => Membership, membership => membership.users)
  @JoinTable({
    name: 'userxmembership' // Join table for users and memberships
  })
  memberships: Membership[];

  // Many-to-Many relationship with Role
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'userxrole' // Join table for users and roles
  })
  roles: Role[];

  // Many-to-Many relationship with Event
  @ManyToMany(() => Event, event => event.users)
  @JoinTable({
    name: 'userxevent' // Join table for users and events
  })
  events: Event[];
}
