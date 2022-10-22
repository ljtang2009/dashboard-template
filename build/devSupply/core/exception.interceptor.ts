import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private logger = new Logger('Global Exception Interceptor');
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(err);
        return of(err);
      }),
    );
  }
}
