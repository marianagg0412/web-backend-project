import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/models/entities/model.entity';
import { Photo } from './entities/photo.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
  const { eventId, modelId, photoUrl, price, digitalOrPhysical } = createPhotoDto;

  const event = await this.eventRepository.findOneBy({ id: eventId });
  const model = await this.modelRepository.findOneBy({ id: modelId });

  if (!event || !model) {
    throw new NotFoundException('Event or Model not found');
  }

  const photo = this.photoRepository.create({
    event,
    model,
    photoUrl: photoUrl,            // Include the photoUrl field
    price,                         // Include the price field
    digitalOrPhysical: digitalOrPhysical,  // Include the digitalOrPhysical field
  });

  return this.photoRepository.save(photo);
}


  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find({
      relations: ['event', 'model'],
    });
  }

  async findOne(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOneBy({ id });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    const photo = await this.photoRepository.findOneBy({ id });
  
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
  
    if (updatePhotoDto.eventId) {
      const event = await this.eventRepository.findOneBy({ id: updatePhotoDto.eventId });
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      photo.event = event;
    }
  
    if (updatePhotoDto.modelId) {
      const model = await this.modelRepository.findOneBy({ id: updatePhotoDto.modelId });
      if (!model) {
        throw new NotFoundException('Model not found');
      }
      photo.model = model;
    }
  
    Object.assign(photo, updatePhotoDto); // Update other fields if provided
  
    return this.photoRepository.save(photo);
  }
  

  async remove(id: number): Promise<void> {
    const result = await this.photoRepository.findOne({where: { id }});

    if(!result) {
      throw new NotFoundException('Photo not found');
    }
    result.isActive = 0;
    await this.photoRepository.save(result);
  }
}
