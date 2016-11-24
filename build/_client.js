/* eslint no-nested-ternary: off */

import { resolve, join } from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

export default function createCompiler({ hotReload = true }) {
    const dev = hotReload;
    const dir = resolve('.');
    const clientDir = join(dir, 'client');
    const serverDir = join(dir, 'server');
    const nodeModulesDir = join(dir, 'node_modules');
    const distDir = join(dir, '.dist');

    const config = {};

    config.devtool = dev ? '#cheap-module-eval-source-map' : '#source-map';

    config.target = 'web';

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': dev ? JSON.stringify('development') : JSON.stringify('production'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'core',
            minChunks: Infinity,
        }),
        new AssetsPlugin({
            path: serverDir,
            prettyPrint: true,
            filename: 'assets.json',
        }),
    ];

    config.context = clientDir;

    config.resolve = {
        modules: [
            nodeModulesDir,
        ],
    };

    config.entry = {
        init: ['./init.js'],
        core: [
            'react',
            'react-dom',
            'react-router',
        ],
    };

    config.output = {
        path: join(distDir, '_init'),
        filename: dev ? '[name].js' : '[name].[chunkhash].js',
        chunkFilename: dev ? '[name].js' : '[name].[chunkhash].js',
        publicPath: dev ? 'http://localhost:3030/' : '/_init/',
        jsonpFunction: '_',
    };

    config.module = {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', ['es2015', { loose: false, modules: false }]],
                plugins: purge([
                    dev ? 'react-hot-loader/babel' : null,
                    'transform-runtime',
                    'transform-async-to-generator',
                    'transform-object-rest-spread',
                    'transform-class-properties',
                ]),
            },
        }],
    };

    config.resolveLoader = {
        modules: [
            nodeModulesDir,
        ],
    };

    if (dev) {
        config.entry.init.unshift(
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=http://localhost:3030/__webpack_hmr&reload=true'
        );

        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    } else {
        config.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                mangle: true,
                compress: {
                    unused: true,
                    dead_code: true,
                    warnings: false,
                },
                comments: false,
            })
        );
    }

    return webpack(config);
}

function purge(config) {
    return config.filter((x) => Boolean(x));
}
