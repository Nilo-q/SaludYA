import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, StreamableFile, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AppService } from "./app.service";
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { createReadStream } from 'fs';


@Controller()
export class UploadFileController {
    constructor(private readonly appService: AppService) {}

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename:  (req, file, cb) => {
                    cb(null, file.originalname.split('.')[0] + '_' + Date.now() + '.pdf');
                    },
            }),
        }),
    )
    @Post('file')
        uploadfile(@UploadedFile() file: Express.Multer.File) {
            if (!file) {
                return { msg: 'No se ha subido ningún archivo' };
                }
                return { msg: `Archivo: ${file.filename} cargado correctamente` };
                }
        
}

@Controller('download')
export class DownloadFileController {
    constructor(private readonly appService: AppService) {}
    @Get(':filename')
    async downloadFile(@Param('filename') filename: string, @Res({ passthrough: true }) res: Response) {
        const filePath = path.join(__dirname, '../uploads', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ msg: 'Archivo no encontrado' });
            }

        const fileStream = createReadStream(filePath);
            res.set({
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Type': 'application/octet-stream',
            });
        return new StreamableFile(fileStream);
    }
}



