import { IsString, IsNumber, IsInt, IsUrl, IsPositive, IsBoolean } from 'class-validator';

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

    @IsUrl()
    readonly imageUrl: string;

    @IsInt()
    @IsPositive()
    readonly eventId: number;

    @IsInt()
    readonly isLegal: number;
}
