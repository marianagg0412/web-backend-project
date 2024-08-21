import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventXModelDto } from './dto/create-eventxmodel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/models/entities/model.entity';
import { Repository } from 'typeorm';
import { EventModel } from './entities/eventxmodel.entity';
import { Event } from 'src/events/entities/event.entity';
import { UpdateEventxmodelDto } from './dto/update-eventxmodel.dto';

@Injectable()
export class EventXModelService {
  constructor(
    @InjectRepository(EventModel)
    private readonly eventXModelRepository: Repository<EventModel>,
    
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createEventXModelDto: CreateEventXModelDto) {
    const { eventId, modelId } = createEventXModelDto;

    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    const model = await this.modelRepository.findOne({ where: { id: modelId } });
    
    if (!event || !model) {
      throw new NotFoundException('Event or Model not found');
    }

    const eventXModel = this.eventXModelRepository.create({
      event,
      model,
    });

    return await this.eventXModelRepository.save(eventXModel);
  }

  async findAll() {
    return await this.eventXModelRepository.find();
  }

  async findOne(id: number) {
    const eventXModel = await this.eventXModelRepository.findOne({ where: { id } });
    
    if (!eventXModel) {
      throw new NotFoundException('EventXModel not found');
    }
    
    return eventXModel;
  }

  async update(id: number, updateEventXModelDto: UpdateEventxmodelDto) {
    const eventXModel = await this.eventXModelRepository.preload({
      id,
      ...updateEventXModelDto,
    });

    if (!eventXModel) {
      throw new NotFoundException('EventXModel not found');
    }

    return await this.eventXModelRepository.save(eventXModel);
  }

  async remove(eventId: number, modelId: number) {
    const result = await this.eventXModelRepository.delete({ event: { id: eventId }, model: { id: modelId } });

    if (result.affected === 0) {
      throw new NotFoundException('EventXModel not found');
    }
  }
}
