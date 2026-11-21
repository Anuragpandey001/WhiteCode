import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

const MAX_SIZE = 8 * 1024 * 1024; // 8MB

@Controller('uploads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post()
  @Roles('superadmin', 'admin', 'editor')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: UploadsService.storage(),
      fileFilter: UploadsService.fileFilter,
      limits: { fileSize: MAX_SIZE },
    }),
  )
  uploadOne(@UploadedFile() file: any) {
    return this.uploads.toPublicUrl(file);
  }

  @Post('many')
  @Roles('superadmin', 'admin', 'editor')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: UploadsService.storage(),
      fileFilter: UploadsService.fileFilter,
      limits: { fileSize: MAX_SIZE },
    }),
  )
  uploadMany(@UploadedFiles() files: any[]) {
    return (files || []).map((f) => this.uploads.toPublicUrl(f));
  }

  @Delete(':filename')
  @Roles('superadmin', 'admin')
  remove(@Param('filename') filename: string) {
    return this.uploads.remove(filename);
  }
}
