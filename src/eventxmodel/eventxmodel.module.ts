import { Module } from '@nestjs/common';
import { EventXModelService } from './eventxmodel.service';
import { EventxmodelController } from './eventxmodel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'src/models/entities/model.entity';
import { EventModel } from './entities/eventxmodel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventModel, Event, Model])],
  controllers: [EventxmodelController],
  providers: [EventXModelService],
})
export class EventxmodelModule {}
