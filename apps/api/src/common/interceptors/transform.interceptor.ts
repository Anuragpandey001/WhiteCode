import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/** Wraps every successful payload as { success, data, meta? }. */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((payload) => {
        if (
          payload &&
          typeof payload === 'object' &&
          'items' in payload &&
          'meta' in payload
        ) {
          return {
            success: true,
            data: (payload as any).items,
            meta: (payload as any).meta,
          };
        }
        return { success: true, data: payload ?? null };
      }),
    );
  }
}
