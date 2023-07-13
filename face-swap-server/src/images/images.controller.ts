import { Controller, Post, UseInterceptors, UploadedFile, Body, Get } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwapFacesDto } from './model/swap-faces.dto';

@Controller('images')
export class ImagesController {
    constructor(private imagesService: ImagesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() image: Express.Multer.File) {
        return this.imagesService.uploadImage(image);
    }

    @Post('swap-faces')
    swapFaces(@Body() data: SwapFacesDto) {
        return this.imagesService.swapFaces(data);
    }
}
