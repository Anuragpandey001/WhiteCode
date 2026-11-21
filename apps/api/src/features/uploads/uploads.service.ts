import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

const ALLOWED = /\.(png|jpe?g|webp|gif|svg|pdf|mp4|webm)$/i;

@Injectable()
export class UploadsService {
  constructor(private readonly config: ConfigService) {}

  static storage() {
    const dir = process.env.UPLOAD_DIR || 'uploads';
    const full = join(process.cwd(), dir);
    if (!existsSync(full)) mkdirSync(full, { recursive: true });

    return diskStorage({
      destination: full,
      filename: (_req, file, cb) => {
        const safe = file.originalname
          .toLowerCase()
          .replace(extname(file.originalname), '')
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 40);
        cb(null, `${safe}-${randomUUID().slice(0, 8)}${extname(file.originalname)}`);
      },
    });
  }

  static fileFilter(_req: any, file: any, cb: any) {
    if (!ALLOWED.test(file.originalname)) {
      return cb(
        new BadRequestException('Only images, PDFs and mp4/webm videos are allowed'),
        false,
      );
    }
    cb(null, true);
  }

  toPublicUrl(file: any) {
    const base = this.config.get<string>('publicUrl');
    return {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `${base}/uploads/${file.filename}`,
    };
  }

  remove(filename: string) {
    const dir = this.config.get<string>('uploadDir') || 'uploads';
    const path = join(process.cwd(), dir, filename.replace(/[\\/]/g, ''));
    if (!existsSync(path)) throw new BadRequestException('File not found');
    unlinkSync(path);
    return { filename, deleted: true };
  }
}
