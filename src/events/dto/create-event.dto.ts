import { IsString, IsDate, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateEventDto {
    @IsString()
    readonly name: string;

    @IsDate()
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
    readonly models?: number[];  //ids of models
}
