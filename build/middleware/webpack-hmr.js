import webpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from './apply-express';

export default function (compiler, opts) {
    const middleware = webpackHotMiddleware(compiler, opts);

    return async (ctx, next) => {
        const hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

        if (hasNext && next) {
            await next();
        }
    };
}
