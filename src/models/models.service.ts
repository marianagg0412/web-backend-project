import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) { }

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const model = this.modelRepository.create(createModelDto);
    return await this.modelRepository.save(model);
  }

  async findAll(): Promise<Model[]> {
    return await this.modelRepository.find();
  }

  async findOne(id: number): Promise<Model> {
    const model = await this.modelRepository.findOne({where: {id}});
    if(!model) {
      throw new NotFoundException('Model not found');
    }
    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const model = await this.findOne(id); 
    const updatedModel = Object.assign(model, updateModelDto);
    return await this.modelRepository.save(updatedModel);
  }

  async remove(id: number) {
    await this.modelRepository.delete(id);
  }
}
