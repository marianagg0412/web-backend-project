import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { RolesGuard } from 'src/Auth/RolesGuard';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
  
  @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('User', 'Admin')
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Put(':userId/roles/:roleId')
  async addRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ): Promise<User> {
    return this.usersService.addRoleToUser(userId, roleId);
  }

  @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'User', 'VIP')
  @Put(':userId/memberships/:membershipId')
  async addMembershipToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('membershipId', ParseIntPipe) membershipId: number
  ): Promise<User> {
    return this.usersService.addMembershipToUser(userId, membershipId);
  }
}
