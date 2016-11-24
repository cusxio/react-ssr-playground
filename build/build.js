import { resolve } from 'path';
import del from 'del';
import client from './_client';
import server from './_server';

async function build() {
    await del(resolve('.', '.dist'));

    try {
        const clientCompiler = client({ target: 'web', hotReload: false });
        await new Promise((resolve, reject) => {
            clientCompiler.run((err, stats) => {
                if (err) {
                    reject(err);
                }
                // https://github.com/webpack/webpack/blob/v2.1.0-beta.27/lib/Stats.js#L331
                if (stats.hasErrors()) {
                    return reject(stats.toString('errors-only'));
                }

                console.log(':: client compilation complete');
                return resolve();
            });
        });

        const serverCompiler = server();

        await new Promise((resolve, reject) => {
            serverCompiler.run((err, stats) => {
                if (err) {
                    reject(err);
                }
                if (stats.hasErrors()) {
                    return reject(stats.toString('errors-only'));
                }

                console.log(':: server compilation complete');
                return resolve();
            });
        });
    } catch (err) {
        console.error(err);
    }
}

build();
