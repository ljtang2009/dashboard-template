import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'

const apiProxy = createProxyMiddleware({
  target: process.env['MOCK_SERVER_URL']
});

@Injectable()
export class ApiProxyMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    apiProxy(req, res, next);
  }
}
