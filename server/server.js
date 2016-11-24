import { Z_SYNC_FLUSH } from 'zlib';
import Koa from 'koa';
import responseTime from 'koa-response-time';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import compression from 'koa-compress';
import router from './router';

const PORT = process.env.PORT || '3000';

const app = new Koa();
app.use(responseTime());
app.use(logger());
app.use(compression({
    flush: Z_SYNC_FLUSH,
}));
app.use(bodyParser());

app.use(router.routes());

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`> Ready on http://localhost:${PORT}`);
});
