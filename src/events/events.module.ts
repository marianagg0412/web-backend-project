import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { ModelsModule } from 'src/models/models.module';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User]),
    ModelsModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
