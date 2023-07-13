import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PythonShell } from 'python-shell';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { ImageModel } from './model/images.model';
import { SwapFacesDto } from './model/swap-faces.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op } from 'sequelize';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(ImageModel) private imageRepository: typeof ImageModel) {}
    private readonly logger = new Logger(ImagesService.name);

    async writeFile(file: Express.Multer.File): Promise<string> {
        try {
            const fileType = file.mimetype;
            if (fileType === 'image/jpeg' || fileType === 'image/png') {
                const fileName = uuid.v4() + (fileType === 'image/jpeg' ? '.jpg' : '.png');
                const filePath = path.resolve(__dirname, '../../../face-swap-py', 'imgs');
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path.join(filePath, fileName), file.buffer);
                return fileName;
            }

            throw new HttpException('Only jpg or png allowed', HttpStatus.BAD_REQUEST);
        } catch (e) {
            throw new HttpException('An error occurred while writing file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFile(fileName: string) {
        const imageName = fileName.split('.')[0];
        let filePath: string;

        if (imageName.length === 36) {
            filePath = path.resolve(__dirname, '../../../face-swap-py', 'imgs');
        } else {
            filePath = path.resolve(__dirname, '../../../face-swap-py', 'results');
        }

        try {
            fs.unlinkSync(path.join(filePath, fileName));
        } catch (error) {
            throw new HttpException('Error occurred while deleting file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async uploadImage(image: Express.Multer.File) {
        const imageName = await this.writeFile(image);
        const writeDataAboutImageToDB = await this.imageRepository.create({ image: imageName });
        return writeDataAboutImageToDB;
    }

    async swapFaces(data: SwapFacesDto) {
        let result = {
            firstImage: '',
            secondImage: ''
        };
        const firstImageName = data.firstImage.split('.')[0];
        const secondImageName = data.secondImage.split('.')[0];

        const firstPyOptions = {
            scriptPath: '../face-swap-py',
            args: [
                `--src`,
                `../face-swap-py/imgs/${data.secondImage}`,
                `--dst`,
                `../face-swap-py/imgs/${data.firstImage}`,
                `--out`,
                `../face-swap-py/results/${secondImageName}_${firstImageName}.jpg`,
                '--correct_color'
            ]
        };

        const secondPyOptions = {
            scriptPath: '../face-swap-py',
            args: [
                `--src`,
                `../face-swap-py/imgs/${data.firstImage}`,
                `--dst`,
                `../face-swap-py/imgs/${data.secondImage}`,
                `--out`,
                `../face-swap-py/results/${firstImageName}_${secondImageName}.jpg`,
                '--correct_color'
            ]
        };

        await PythonShell.run('main.py', firstPyOptions).then(() => {
            result.firstImage = `${secondImageName}_${firstImageName}.jpg`;
        });

        await PythonShell.run('main.py', secondPyOptions).then(() => {
            result.secondImage = `${firstImageName}_${secondImageName}.jpg`;
        });

        //write data to db
        await this.imageRepository.create({ image: result.firstImage });
        await this.imageRepository.create({ image: result.secondImage });

        return result;
    }

    async removeItemById(itemId) {
        await this.imageRepository.destroy({ where: { id: itemId } });
    }

    async getExpiredItems() {
        const date = new Date();
        date.setDate(date.getDate() - 1);

        //'lte' means less than or equal // also 'lt', 'gt', 'gte' available
        const expiredItems = await this.imageRepository.findAll({ where: { createdAt: { [Op.lte]: date } } });
        return expiredItems;
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async clearData(): Promise<void> {
        this.logger.log('Deleting old data...');

        const itemsToRemove = await this.getExpiredItems();

        if (itemsToRemove.length > 0) {
            for (let i = 0; i < itemsToRemove.length; i++) {
                await this.deleteFile(itemsToRemove[i].image);
                await this.removeItemById(itemsToRemove[i].id);
            }
        }
    }
}
