import express from 'express';
import path from 'path';
import open from 'open';
import getPort from 'get-port';
import { previewPort } from '@build/config';

async function launchServer() {
  const app = express();
  const port = await getPort({
    port: previewPort,
  });
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.listen(port, () => {
    const url = `http://127.0.0.1:${port}`;
    open(url);
    console.log(url);
  });
}

launchServer();
