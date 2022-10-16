import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import getPort from 'get-port';
import { devSupplyServerPort } from '../config';
import applyRouter from './router/router';

async function launchServer() {
  const app = express();
  const port = await getPort({
    port: devSupplyServerPort,
  });

  // 在终端中查看日志
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  applyRouter(app);

  // eslint-disable-next-line max-params
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  });

  app.use((_req, res) => {
    res.status(404).send("Sorry can't find that!");
  });

  app.listen(port);
  return {
    port,
  };
}

export default launchServer;
