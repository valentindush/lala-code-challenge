import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Get,
    Param,
    Res,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
    ApiTags,
    ApiOperation,
    ApiConsumes,
    ApiBody,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('files')
@ApiBearerAuth()
@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({
        summary: 'Upload a file',
        description: 'Upload a file (image) to the server. Only authenticated users can upload files.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'The file to upload',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'File uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    example: 'http://localhost:3000/files/filename.jpg',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Bad request (invalid file type or size)' })
    @ApiResponse({ status: 401, description: 'Unauthorized (missing or invalid token)' })
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `${process.env.BACKEND_URL}/api/v1/files/${file.filename}`,
        };
    }

    @Get(':filename')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get a file',
        description: 'Retrieve a file by its filename. Only authenticated users can access files.',
    })
    @ApiParam({
        name: 'filename',
        description: 'The name of the file to retrieve',
        example: 'example.jpg',
    })
    @ApiResponse({
        status: 200,
        description: 'File content',
        content: {
            'image/*': {},
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized (missing or invalid token)' })
    @ApiResponse({ status: 404, description: 'File not found' })
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
        const file = await this.fileService.getFile(filename);
        const contentType = this.fileService.getContentType(filename);

        res.setHeader('Content-Type', contentType);
        file.pipe(res);
    }
}