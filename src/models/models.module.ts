import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model]), // Correct entity imported here
  ],
  controllers: [ModelsController],
  providers: [ModelsService],
  exports: [ModelsService, TypeOrmModule], // Exporting TypeOrmModule so other modules can use ModelRepository
})
export class ModelsModule {}
