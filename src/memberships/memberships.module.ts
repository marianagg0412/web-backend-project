import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMembership } from 'src/userxmembership/entities/userxmembership.entity';
import { Membership } from './entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membership, UserMembership])],
  controllers: [MembershipsController],
  providers: [MembershipsService],
})
export class MembershipsModule {}
