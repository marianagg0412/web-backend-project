import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventProduct } from './entities/eventxproduct.entity';
import { CreateEventXProductDto } from './dto/create-eventxproduct.dto';
import { Product } from 'src/products/entities/product.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class EventXProductService {
  constructor(
    @InjectRepository(EventProduct)
    private readonly eventXProductRepository: Repository<EventProduct>,
    
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createEventXProductDto: CreateEventXProductDto): Promise<EventProduct> {
    const { eventId, productId } = createEventXProductDto;

    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!event || !product) {
      throw new NotFoundException('Event or Product not found');
    }

    const eventXProduct = this.eventXProductRepository.create({
      event,
      product,
    });

    return await this.eventXProductRepository.save(eventXProduct);
  }

  async findAll(): Promise<EventProduct[]> {
    return await this.eventXProductRepository.find();
  }

  async findOne(id: number): Promise<EventProduct> {
    const eventXProduct = await this.eventXProductRepository.findOne({ where: { id } });
    if (!eventXProduct) {
      throw new NotFoundException('EventProduct not found');
    }
    return eventXProduct;
  }

  async update(id: number, updateEventXProductDto: Partial<CreateEventXProductDto>): Promise<EventProduct> {
    const eventXProduct = await this.eventXProductRepository.preload({
      id,
      ...updateEventXProductDto,
    });

    if (!eventXProduct) {
      throw new NotFoundException('EventProduct not found');
    }

    return await this.eventXProductRepository.save(eventXProduct);
  }

  async remove(eventId: number, productId: number): Promise<void> {
    const result = await this.eventXProductRepository.delete({ event: { id: eventId }, product: { id: productId } });
    if (result.affected === 0) {
      throw new NotFoundException('EventProduct not found');
    }
  }
}
