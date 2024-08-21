import { Module } from '@nestjs/common';
import { EventXProductService } from './eventxproduct.service';
import { EventxproductController } from './eventxproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { EventProduct } from './entities/eventxproduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventProduct, Event, Product])],
  controllers: [EventxproductController],
  providers: [EventXProductService],
})
export class EventxproductModule {}
