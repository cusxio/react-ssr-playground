import Koa from 'koa';
import createCompiler from '../build/_client';

import devMiddleware from '../build/middleware/webpack-dev';
import hotMiddleware from '../build/middleware/webpack-hmr';

const app = new Koa();
const PORT = 3030;

const compiler = createCompiler({ hotReload: true });
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
    // https://github.com/webpack/webpack/blob/v2.1.0-beta.27/lib/Stats.js#L738-L778
    stats: 'errors-only',
}));
app.use(hotMiddleware(compiler, {
    log: () => {},
}));

app.listen(PORT, (err) => {
    if (err) {
        console.err(err);
    }
    console.log(`> Ready on http://localhost:${PORT}`);
});

