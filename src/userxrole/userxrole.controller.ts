import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserxroleService } from './userxrole.service';
import { CreateUserXRoleDto } from './dto/create-userxrole.dto';
import { UpdateUserxroleDto } from './dto/update-userxrole.dto';
import { UserRole } from './entities/userxrole.entity';

@Controller('userxrole')
export class UserxroleController {
  constructor(private readonly userxroleService: UserxroleService) {}

  @Post()
  async create(@Body() createUserxroleDto: CreateUserXRoleDto): Promise<UserRole> {
    return this.userxroleService.create(createUserxroleDto);
  }

  @Get()
  async findAll(): Promise<UserRole[]> {
    return this.userxroleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserRole> {
    return this.userxroleService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserxroleDto: UpdateUserxroleDto): Promise<UserRole> {
    return this.userxroleService.update(id, updateUserxroleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userxroleService.remove(id);
  }
}
