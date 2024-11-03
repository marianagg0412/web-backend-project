import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

    if (typeof eventData.date === 'string') {
      eventData.date = new Date(eventData.date);
    }
  
    // Fetch models using the new method
    const models = modelIds && modelIds.length > 0 
      ? await this.modelRepository.findBy({ id: In(modelIds) }) 
      : [];  // Use In to filter by an array of IDs
  
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

  // Fetch the existing event with its models
  const event = await this.eventRepository.findOne({
    where: { id },
    relations: ['models'],
  });

  if (!event) {
    throw new NotFoundException(`Event with ID ${id} not found`);
  }

  // Update fields other than relationships
  Object.assign(event, eventData);

  if (modelIds !== undefined) {
    // Fetch the new models
    const models = await this.modelRepository.findBy({ id: In(modelIds) });

    // Clear the existing models and set the new ones
    event.models = models;
  }

  return this.eventRepository.save(event);
}


  async getModelsForEvent(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['models'],  // Load related models
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }
    return event.models;
  }

  async getProductsForEvent(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['products'],  // Load related models
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }
    return event.products;
  }
  

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);

    if(!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    event.isActive = 0;
    await this.eventRepository.save(event);
  }
}
