import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { RolesGuard } from 'src/Auth/RolesGuard';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async create(@Body() createModelDto: CreateModelDto) {
    return await this.modelsService.create(createModelDto);
  }

  @Get()
  async findAll() {
    return await this.modelsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin','Editor', 'Sponsor','Partner')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.modelsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin','Editor')
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateModelDto: UpdateModelDto) {
    return await this.modelsService.update(+id, updateModelDto);
  } 

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.modelsService.remove(+id);
  }
}
