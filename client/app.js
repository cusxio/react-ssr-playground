import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router';
import Layout from './containers/Layout';

const AppContainer = process.env.NODE_ENV === 'production' ? ({ children }) => (children) : require('react-hot-loader').AppContainer;

// fbjs ExecutionEnvironment.js
const canUseDOM = Boolean(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

const Router = canUseDOM ? BrowserRouter : MemoryRouter;

export default function () {
    return (
        <AppContainer>
            <Router>
                <Layout />
            </Router>
        </AppContainer>
    );
}
