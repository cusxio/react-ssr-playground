import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import Helmet from 'react-helmet';
import { renderStaticOptimized } from 'glamor/server';
import Layout from '../../../client/containers/Layout';

export default function setServerRenderContext() {
    return async (ctx, next) => {
        const context = createServerRenderContext();

        const { html, css, ids } = renderStaticOptimized(() => (
            renderToString(
                <ServerRouter location={ctx.req.url} context={context}>
                    <Layout />
                </ServerRouter>
           )
       ));

        // returns an object; { redirect, miss }
        const result = context.getResult();

        if (result.redirect) {
            ctx.redirect(result.redirect.pathname + result.redirect.search);
        } else if (result.missed) {
            ctx.status = 404;
            ctx.body = 'Error';
        }

        const head = Helmet.rewind();

        ctx.routerContext = {
            html,
            head,
            css,
            data: {
                ids,
            },
        };

        await next();
    };
}

