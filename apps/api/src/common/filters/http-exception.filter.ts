import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Internal server error';
    let error = 'Error';

    if (exception instanceof HttpException) {
      const body = exception.getResponse() as any;
      message = typeof body === 'string' ? body : body.message ?? exception.message;
      error = typeof body === 'object' && body.error ? body.error : exception.name;
    } else if (exception instanceof Error) {
      // duplicate key coming from Mongo
      if ((exception as any).code === 11000) {
        return res.status(HttpStatus.CONFLICT).json({
          success: false,
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: 'A record with these details already exists',
          path: req.originalUrl,
        });
      }
      this.logger.error(exception.message, exception.stack);
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      error,
      message,
      path: req.originalUrl,
      requestId: (req as any).requestId,
      timestamp: new Date().toISOString(),
    });
  }
}
