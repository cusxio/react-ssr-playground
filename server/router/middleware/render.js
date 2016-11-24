import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Document from '../../document';

export default function render() {
    return async (ctx) => {
        const { html, head, css, data } = ctx.routerContext;
        const doc = createElement(Document, {
            html,
            head,
            css,
            data,
            dev: ctx.dev,
        });

        ctx.body = `<!DOCTYPE html>${renderToStaticMarkup(doc)}`;
    };
}
