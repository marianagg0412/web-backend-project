import { IsOptional, IsString } from "class-validator";

export class CreateModelDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly portfolioUrl: string;

    @IsString()
    readonly bookingInfo: string;

    @IsString()
    @IsOptional()
    readonly photosUrl?: string;
}
