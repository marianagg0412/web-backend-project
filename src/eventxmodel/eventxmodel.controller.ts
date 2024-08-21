import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EventXModelService } from './eventxmodel.service';
import { CreateEventXModelDto } from './dto/create-eventxmodel.dto';
import { UpdateEventxmodelDto } from './dto/update-eventxmodel.dto';

@Controller('eventxmodel')
export class EventxmodelController {
  constructor(private readonly eventXModelService: EventXModelService) {}

  @Post()
  async create(@Body() createEventXModelDto: CreateEventXModelDto) {
    return await this.eventXModelService.create(createEventXModelDto);
  }

  @Get()
  async findAll() {
    return await this.eventXModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.eventXModelService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEventXModelDto: UpdateEventxmodelDto) {
    return await this.eventXModelService.update(id, updateEventXModelDto);
  }

  @Delete(':eventId/:modelId')
  async remove(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('modelId', ParseIntPipe) modelId: number,
  ) {
    return await this.eventXModelService.remove(eventId, modelId);
  }
}
