import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as process from 'process';
import { PREFIXES } from '../../mok/prefixes.mok';
import { NO_FILE_PROVIDED_ERROR } from '../../mok/upload.mok';
import { generateStorageConfiguration } from '../../utils/upload.utils';

const storage = generateStorageConfiguration();

@Controller(PREFIXES.UPLOAD)
export class UploadController {
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException(NO_FILE_PROVIDED_ERROR, HttpStatus.BAD_REQUEST);
    }
    const imageUrl = `${process.env.IMAGE_PATH}/uploads/${file.filename}`;
    return {
      url: imageUrl,
    };
  }
}
