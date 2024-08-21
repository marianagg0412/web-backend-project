import { PartialType } from '@nestjs/swagger';
import { CreateEventXProductDto } from './create-eventxproduct.dto';

export class UpdateEventxproductDto extends PartialType(CreateEventXProductDto) {}
