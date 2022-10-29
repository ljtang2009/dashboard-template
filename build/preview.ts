import { initEnv } from '@build/utils/env';
initEnv();
import express from 'express';
import path from 'path';
import open from 'open';
import getPort from 'get-port';

async function launchServer() {
  const app = express();
  const port = await getPort({
    port: parseInt(process.env['PREVIEW_PORT']!, 10),
  });
  app.use(express.static(path.resolve(process.cwd(), './dist')));
  app.listen(port, () => {
    const url = `http://127.0.0.1:${port}`;
    open(url);
    console.log(url);
  });
}

launchServer();
