import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserMembership } from '../../userxmembership/entities/userxmembership.entity';
import { UserRole } from '../../userxrole/entities/userxrole.entity';
import { Role } from '../../role/entities/role.entity';
import { Event } from '../../events/entities/event.entity'; // Import the Event entity

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

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @OneToMany(() => UserMembership, (userMembership) => userMembership.user)
  userMemberships: UserMembership[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  // New Many-to-Many relationship with Event
  @ManyToMany(() => Event, event => event.users)
  @JoinTable({
    name: 'userxevent'
  }) // This will create the join table to manage the relationship
  events: Event[];
}
