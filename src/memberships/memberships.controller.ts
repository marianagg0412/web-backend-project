import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { RolesGuard } from 'src/Auth/RolesGuard';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';


@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get()
  findAll() {
    return this.membershipsService.findAll();
  }

  @Get('active')
  findAllActive() {
    return this.membershipsService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membershipsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin','Editor')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMembershipDto: UpdateMembershipDto) {
    return this.membershipsService.update(id, updateMembershipDto);
  }

  @UseGuards(AuthGuard, JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id/deactivate')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membershipsService.remove(id);
  }
}
