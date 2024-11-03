import { IsString, IsNumber, IsInt, IsUrl, IsPositive, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsString()
    readonly description: string;

    @IsInt()
    @IsPositive()
    readonly stock: number;

    @IsString()
    readonly category: string;

    @IsUrl()
    readonly imageUrl: string;

    @IsInt()
    @IsPositive()
    readonly eventId: number;

    @IsInt()
    @IsOptional()
    readonly isLegal: number;
}
