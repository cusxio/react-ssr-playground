import React from 'react';
import Helmet from 'react-helmet';
import { container } from './styles';

const Home = () => (
    <div {...container}>
        <Helmet
            title="Home"
        />
        <h2>Home</h2>
    </div>
);

export default Home;
