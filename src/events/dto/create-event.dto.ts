import { IsString, IsDate, IsOptional, IsArray, IsUrl, IsNumber } from 'class-validator';

export class CreateEventDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly date: Date;

    @IsOptional()
    @IsString()
    readonly location?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsUrl()
    readonly imagesUrl?: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })  // Ensures that each element is a number
    readonly models?: number[];  // ids of models
}
