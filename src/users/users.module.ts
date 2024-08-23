import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { PasswordService } from 'src/Auth/security/PasswordService';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Membership]), 
  ],
  providers: [UsersService, PasswordService], 
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
