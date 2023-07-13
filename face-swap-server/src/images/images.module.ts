import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImageModel } from './model/images.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../face-swap-py', 'imgs'),
            serveRoot: '/images/uploaded/'
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../face-swap-py', 'results'),
            serveRoot: '/images/results/'
        }),
        SequelizeModule.forFeature([ImageModel]),
        ScheduleModule.forRoot()
    ],
    providers: [ImagesService],
    controllers: [ImagesController]
})
export class ImagesModule {}
