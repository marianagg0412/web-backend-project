import { Module } from '@nestjs/common';
import { UserMembershipService } from './userxmembership.service';
import { UserxmembershipController } from './userxmembership.controller';
import { Membership } from 'src/memberships/entities/membership.entity';
import { UserMembership } from './entities/userxmembership.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership, UserMembership])],
  controllers: [UserxmembershipController],
  providers: [UserMembershipService],
})
export class UserxmembershipModule {}
