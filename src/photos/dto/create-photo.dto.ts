import { IsString, IsNumber, IsInt, IsPositive } from 'class-validator';

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

    @IsString()
    readonly digitalOrPhysical: string;
}
