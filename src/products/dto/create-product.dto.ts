import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    readonly name: string;
    @IsNumber()
    @IsPositive()
    readonly price: number;
    @IsString()
    @IsOptional()
    readonly description?: string;
    @IsNumber()
    @Min(0)
    readonly stock: number;
    @IsOptional()
    @IsString()
    readonly imagesUrl?: string;
  }
  