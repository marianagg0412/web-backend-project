import { IsString, IsNumber, IsUrl, IsOptional } from 'class-validator';

export class CreateMembershipDto {
    @IsString()
    readonly tier: string;

    @IsString()
    readonly benefits: string;

    @IsNumber()
    readonly price: number;

    @IsUrl()
    readonly exclusivecontenturl: string;

    @IsNumber()
    @IsOptional()
    readonly isActive: number;
}
