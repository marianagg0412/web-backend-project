import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { ModelsModule } from 'src/models/models.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User]),
    ModelsModule, // Import ModelsModule here
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
