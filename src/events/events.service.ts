import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'src/models/entities/model.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { models: modelIds, ...eventData } = createEventDto;

    const models = await this.modelRepository.findByIds(modelIds || []);  // Fetch the models

    const event = this.eventRepository.create({
      ...eventData,
      models,  // Attach the fetched model entities
    });

    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const { models: modelIds, ...eventData } = updateEventDto;

    const models = await this.modelRepository.findByIds(modelIds || []);  // Fetch the models

    await this.eventRepository.update(id, {
      ...eventData,
      models,  // Attach the fetched model entities
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
  }
}
