import { PartialType } from '@nestjs/swagger';
import { CreateEventXModelDto } from './create-eventxmodel.dto';

export class UpdateEventxmodelDto extends PartialType(CreateEventXModelDto) {}
