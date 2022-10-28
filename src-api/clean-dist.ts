import { resolve } from 'path';
import { removeSync } from 'fs-extra';

removeSync(resolve(process.cwd(), './dist-api'));
