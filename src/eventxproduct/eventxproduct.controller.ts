import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EventXProductService } from './eventxproduct.service';
import { CreateEventXProductDto } from './dto/create-eventxproduct.dto';
import { UpdateEventxproductDto } from './dto/update-eventxproduct.dto';

@Controller('eventxproduct')
export class EventxproductController {
  constructor(private readonly eventXProductService: EventXProductService) {}

  @Post()
  async create(@Body() createEventXProductDto: CreateEventXProductDto) {
    return await this.eventXProductService.create(createEventXProductDto);
  }

  @Get()
  async findAll() {
    return await this.eventXProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.eventXProductService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEventXProductDto: UpdateEventxproductDto) {
    return await this.eventXProductService.update(id, updateEventXProductDto);
  }

  @Delete(':eventId/:productId')
  async remove(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return await this.eventXProductService.remove(eventId, productId);
  }
}
