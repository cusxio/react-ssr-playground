import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles';

const Home = () => (
    <div {...styles}>
        <Helmet
            title="Home"
        />
        <h2>Home</h2>
    </div>
);

export default Home;
