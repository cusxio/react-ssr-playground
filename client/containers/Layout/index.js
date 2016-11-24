import React from 'react';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import { nav, ul } from './styles';

export default () => (
    <div>
        <nav {...nav}>
            <ul {...ul}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/about" component={About} />
        <Match pattern="/contact" component={Contact} />
    </div>
);
