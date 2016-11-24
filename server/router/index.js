import { resolve } from 'path';
import Router from 'koa-router';
import serveStatic from 'koa-static';
import setContext from './middleware/server-render-context';
import render from './middleware/render';

const router = new Router();

const dir = resolve('.', '.dist');

router.get('/_init/*', serveStatic(dir));
router.get('*', setContext(), render());

export default router;
