import { IsString, IsEmail, IsOptional, ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly membershipstatus?: string;  

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  readonly roleIds?: number[];
}
