import { PartialType } from '@nestjs/swagger';
import { CreateUserXRoleDto } from './create-userxrole.dto';

export class UpdateUserxroleDto extends PartialType(CreateUserXRoleDto) {}
