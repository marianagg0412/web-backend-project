import { PartialType } from '@nestjs/swagger';
import { CreateUserXMembershipDto } from './create-userxmembership.dto';

export class UpdateUserxmembershipDto extends PartialType(CreateUserXMembershipDto) {}
