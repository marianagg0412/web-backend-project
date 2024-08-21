import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserMembershipService } from './userxmembership.service';
import { CreateUserXMembershipDto } from './dto/create-userxmembership.dto';
import { UpdateUserxmembershipDto } from './dto/update-userxmembership.dto';
import { UserMembership } from './entities/userxmembership.entity';

@Controller('userxmembership')
export class UserxmembershipController {
  constructor(private readonly userMembershipService: UserMembershipService) {}

  @Post()
  async create(@Body() createUserXMembershipDto: CreateUserXMembershipDto): Promise<UserMembership> {
    return this.userMembershipService.create(createUserXMembershipDto);
  }

  @Get()
  async findAll(): Promise<UserMembership[]> {
    return this.userMembershipService.findAll();
  }

  @Get(':userId/:membershipId')
  async findOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('membershipId', ParseIntPipe) membershipId: number
  ): Promise<UserMembership> {
    return this.userMembershipService.findOne(userId, membershipId);
  }

  @Patch(':userId/:membershipId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('membershipId', ParseIntPipe) membershipId: number,
    @Body() updateUserXMembershipDto: UpdateUserxmembershipDto
  ): Promise<UserMembership> {
    return this.userMembershipService.update(userId, membershipId, updateUserXMembershipDto);
  }

  @Delete(':userId/:membershipId')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('membershipId', ParseIntPipe) membershipId: number
  ): Promise<void> {
    return this.userMembershipService.remove(userId, membershipId);
  }
}
