import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
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
    const { models, ...eventData } = createEventDto;

    // Fetch the related models from the database using the updated find method
    const modelEntities = models ? await this.modelRepository.find({
      where: {
        id: In(models),
      },
    }) : [];

    // Create a new event entity
    const event = this.eventRepository.create({
      ...eventData,
      models: modelEntities,
    });

    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    // Fetch the existing event
    const existingEvent = await this.eventRepository.findOneBy({ id });
    if (!existingEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    let modelEntities = existingEvent.models;
    if (updateEventDto.models) {
      modelEntities = await this.modelRepository.find({
        where: {
          id: In(updateEventDto.models),
        },
      });
    }

      const updatedEvent = this.eventRepository.merge(existingEvent, {
        ...updateEventDto,
        models: modelEntities,
      });
      
    return await this.eventRepository.save(updatedEvent);
  }


  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
