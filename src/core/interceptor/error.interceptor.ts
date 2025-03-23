import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const customMessage = request.customMessage || 'An unexpected error occurred';

    return next.handle().pipe(
      catchError(err => {
        const statusCode = err.status || 500;
        const message = customMessage;

        return throwError(() => new BadRequestException({
          statusCode,
          success: false,
          message,
          error: err.response?.message || err.message,
          timestamp: new Date().toISOString(),
        }));
      }),
    );
  }
}
