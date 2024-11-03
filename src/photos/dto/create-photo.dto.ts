import { IsString, IsNumber, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreatePhotoDto {
    @IsString()
    readonly photoUrl: string;

    @IsInt()
    @IsPositive()
    readonly eventId: number;

    @IsInt()
    @IsPositive()
    readonly modelId: number;

    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsOptional()
    @IsInt()
    readonly isActive: number;

    @IsString()
    readonly digitalOrPhysical: string;
}
