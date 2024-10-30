import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateModelDto {
    @IsString()
    readonly name: string;

    @IsUrl()
    readonly portfolioUrl: string;

    @IsString()
    readonly bookingInfo: string;

    @IsUrl()
    @IsOptional()
    readonly photosUrl?: string;

    @IsOptional() // This makes it optional during creation
    isActive?: boolean;
}
