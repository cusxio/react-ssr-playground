import { resolve, join } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default function createCompiler() {
    const dir = resolve('.');
    const serverDir = join(dir, 'server');
    const distDir = join(dir, '.dist');
    const nodeModulesDir = join(dir, 'node_modules');
    const config = {};

    config.target = 'node';

    config.entry = {
        server: [join(serverDir, 'server.js')],
    };

    config.output = {
        path: distDir,
        filename: 'index.js',
    };

    config.node = {
        __dirname: true,
        __filename: true,
    };

    config.externals = [nodeExternals({
        modulesDir: nodeModulesDir,
    })];

    config.module = {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', ['es2015', { loose: false, modules: false }]],
                plugins: [
                    'transform-runtime',
                    'transform-async-to-generator',
                    'transform-object-rest-spread',
                    'transform-class-properties',
                ],
            },
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader',
        }],
    };

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
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
        }),
    ];

    return webpack(config);
}
