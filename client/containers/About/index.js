import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles';

const About = () => (
    <div {...styles}>
        <Helmet
            title="About"
        />
        <h2>About</h2>
    </div>
);

export default About;
