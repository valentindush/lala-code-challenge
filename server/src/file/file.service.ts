import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { extname } from 'path';
import { stat } from 'fs/promises';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FileService {
  private readonly uploadDir = 'uploads';

  async getFile(filename: string) {
    const filePath = join(process.cwd(), this.uploadDir, filename);
    
    try {
      await stat(filePath);
    } catch {
      throw new NotFoundException('File not found');
    }

    return createReadStream(filePath);
  }

  getContentType(filename: string) {
    const ext = extname(filename).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  }
}