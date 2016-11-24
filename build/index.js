require('babel-core/register')({
    presets: ['es2015', 'react'],
    plugins: [
        'transform-runtime',
        'transform-async-to-generator',
        'transform-object-rest-spread',
        'transform-class-properties',
    ],
});
require('./build');
