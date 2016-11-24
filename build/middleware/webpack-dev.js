import webpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from './apply-express';

export default function (compiler, opts) {
    const middleware = webpackDevMiddleware(compiler, opts);

    function waitUntilValid() {
        return new Promise((resolve, reject) => {
            middleware.waitUntilValid(resolve);

            compiler.plugin('failed', (err) => {
                reject(err);
            });
        });
    }

    return async (ctx, next) => {
        await waitUntilValid();
        const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
            end: (content) => (ctx.body = content),
            setHeader(...args) {
                ctx.set(...args);
            },
        });
        if (hasNext) {
            await next();
        }
    };
}
