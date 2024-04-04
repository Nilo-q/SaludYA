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
        /* Interceptor para manejar la carga de archivos 'file' es el nombre del campo de formulario donde se espera el archivo
        El objeto de opciones configura el almacenamiento y la generación de nombres de archivo */
            storage: diskStorage({
                destination: './uploads', // Directorio donde se guardarán los archivos subidos
                filename:  (req, file, cb) => {
                    cb(null, file.originalname.split('.')[0] + '_' + Date.now() + '.pdf'); // Genera un nombre único para el archivo
                    },
            }),
        }),
    )
    @Post('file')
    /* Método para manejar la carga de archivos @Post('file') indica que este método manejará las solicitudes POST a la ruta '/file'.
    @UploadedFile() inyecta el archivo cargado en el parámetro 'file'.
    'file' es un objeto que representa el archivo cargado, con propiedades como 'filename', 'mimetype', etc.*/
        uploadfile(@UploadedFile() file: Express.Multer.File) {
            if (!file) {
                return { msg: 'No se ha subido ningún archivo' }; // Si no se subió un archivo, devuelve un mensaje
                }
                return { msg: `Archivo: ${file.filename} cargado correctamente` }; // Devuelve un mensaje con el nombre del archivo cargado
                }
        
}

@Controller('download')
export class DownloadFileController {
    constructor(private readonly appService: AppService) {}
    @Get(':filename')
    async downloadFile(@Param('filename') filename: string,  // Extrae el valor del parámetro de ruta 'filename' y lo asigna a la variable 'filename'
    @Res({ passthrough: true }) res: Response) { // Inyecta el objeto 'Response' de Express en el parámetro 'res'  
        // 'passthrough: true' permite que NestJS pase el objeto 'Response' sin modificarlo
        
        const filePath = path.join(__dirname, '../uploads', filename); // Ruta completa del archivo a descargar

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ msg: 'Archivo no encontrado' }); // Si el archivo no existe, devuelve un error 404
            }

        const fileStream = createReadStream(filePath); // Crea un stream de lectura del archivo
            res.set({
                'Content-Disposition': `attachment; filename="${filename}"`, // Establece el encabezado para descargar el archivo
                'Content-Type': 'application/octet-stream', // Establece el tipo de contenido como un flujo de bytes
            });

        return new StreamableFile(fileStream); // Devuelve el archivo como un flujo para descargarlo
    }
}



