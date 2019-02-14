const BundleTracker = require('webpack-bundle-tracker');
const appConfig = require('./src/app.config');
const webpack = require("webpack");
const StatsPlugin = require('stats-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/dist/'
    //     : 'http://127.0.0.1:8080',
    //     : 'http://192.168.0.22:8080',

    publicPath: process.env.NODE_ENV === 'production'
        ? '/dist/'
        : 'http://127.0.0.1:8080',

    css: {
        sourceMap: true
    },

    pluginOptions: {
        i18n: {
            locale: 'at',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    },

    transpileDependencies: [
        'vue-dayjs',
    ],

    configureWebpack: {
        devtool: 'source-map',
        // We provide the app's title in Webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: appConfig.title,
        entry: {
            app: [
                './static/scss/bulma.scss',
                './static/scss/style.scss'
            ]
        },
        // optimization: {
        //     splitChunks: {
        //         cacheGroups: {
        //             vendor: {
        //                 test: /[\\/]node_modules[\\/](video.js|vee-validate)[\\/]/,
        //                 name: 'vendor',
        //                 chunks: 'all',
        //             }
        //         }
        //     }
        // },
        // Set up all the aliases we use in our app.
        resolve: {
            alias: require('./aliases.config').webpack
        },
        plugins: [

            new BundleTracker({ filename: './webpack-stats.json' }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new StatsPlugin('stats.json'),
            new LodashModuleReplacementPlugin,
        ],
    },

    // Configure Webpack's dev server.
    // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
};
