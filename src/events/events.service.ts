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
  
    // Fetch the existing event
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['models'],  // Ensure to load the existing models
    });
  
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  
    // Update fields other than relationships
    Object.assign(event, eventData);
  
    if (modelIds !== undefined) {
      // Fetch the new models
      const models = await this.modelRepository.findBy({ id: In(modelIds) });
  
      // Update the models relationship
      event.models = models;
    }
  
    return this.eventRepository.save(event);
  }
  

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
  }
}
