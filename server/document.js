/* eslint react/no-danger: "off" */

import React, { PropTypes } from 'react';
import { css } from 'glamor';
import assets from './assets.json';

css.insert('*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#000}');

const Document = ({ html, head, css, data }) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            { genHead(head) }
            <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body>
            <div id="__init__" dangerouslySetInnerHTML={{ __html: html }} />
            <script dangerouslySetInnerHTML={{ __html: `__INIT_DATA__ = ${JSON.stringify(data)}` }} />
            <script src={assets.core.js} />
            <script async src={assets.init.js} />
        </body>
    </html>
);

export default Document;

Document.propTypes = {
    html: PropTypes.string,
    head: PropTypes.object,
    css: PropTypes.string,
    data: PropTypes.object,
};

function genHead(head) {
    Object.keys(head).map((tag) => (
        head[tag].toComponent()
    ));
}
