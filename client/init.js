/* eslint global-require: off */

import { createElement } from 'react';
import { render } from 'react-dom';
import { rehydrate } from 'glamor';
import App from './app';

const root = document.getElementById('__init__');

const { __INIT_DATA__: { ids } } = window;

rehydrate(ids);
render(createElement(App), root);

if (module.hot) {
    module.hot.accept('./app', () => {
        render(createElement(App), root);
    });
}
