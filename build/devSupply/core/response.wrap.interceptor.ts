import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class ResponseWrapInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    if (this.canWrap(req)) {
      return next.handle().pipe(
        map((data) => {
          // 设置状态
          res.status(HttpStatus.OK);
          // 设置返回值
          let code = 200;
          let message;
          let _data;
          if (data instanceof Error) {
            message = data.message;
            if (data instanceof HttpException) {
              code = data.getStatus();
            } else {
              code = 500;
            }
          } else {
            _data = data;
          }
          return {
            code,
            message,
            data: _data,
          };
        }),
      );
    } else {
      return next.handle();
    }
  }

  /**
   * 检查是否可以封装
   * @param req
   */
  private canWrap(req: Request) {
    let result = true;
    // 不做封装
    let key: keyof INoWrapUrl;
    for (key in noWrapUrl) {
      if (noWrapUrl.hasOwnProperty(key)) {
        if (req.originalUrl.indexOf(noWrapUrl[key]) > -1) {
          result = false;
          break;
        }
      }
    }
    return result;
  }
}

interface INoWrapUrl {
  getStream: string;
}

export const noWrapUrl: INoWrapUrl = {
  // 下载文件
  getStream: 'getStream',
};
