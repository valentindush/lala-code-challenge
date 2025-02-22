import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const randomName = uuidv4();
                        return cb(null, `${randomName}${extname(file.originalname)}`);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                        return cb(new Error('Only image files are allowed!'), false);
                    }
                    cb(null, true);
                },
                limits: {
                    fileSize: 1024 * 1024 * 8,
                },
            }),
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule { }