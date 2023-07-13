import { IsNotEmpty, IsString } from 'class-validator';

export class SwapFacesDto {
    @IsNotEmpty()
    @IsString()
    firstImage: string;

    @IsNotEmpty()
    @IsString()
    secondImage: string;
}
