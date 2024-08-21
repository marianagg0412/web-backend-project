import { Module } from '@nestjs/common';
import { UserxroleService } from './userxrole.service';
import { UserxroleController } from './userxrole.controller';
import { UserRole } from './entities/userxrole.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
  controllers: [UserxroleController],
  providers: [UserxroleService],
})
export class UserxroleModule {}
