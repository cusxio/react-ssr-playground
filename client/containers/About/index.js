import React from 'react';
import Helmet from 'react-helmet';
import { container } from './styles';

const About = () => (
    <div {...container}>
        <Helmet
            title="About"
        />
        <h2>About</h2>
    </div>
);

export default About;
