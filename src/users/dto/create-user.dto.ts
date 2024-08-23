import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly membershipstatus?: string;  // optional with a default value

    @IsNumber()
    readonly roleId: number;
}
