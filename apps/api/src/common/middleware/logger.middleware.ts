import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/** Logs every request with status + duration. Applied globally in AppModule. */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const started = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const ms = Date.now() - started;
      const msg = `${method} ${originalUrl} ${res.statusCode} - ${ms}ms`;
      if (res.statusCode >= 500) this.logger.error(msg);
      else if (res.statusCode >= 400) this.logger.warn(msg);
      else this.logger.log(msg);
    });

    next();
  }
}
