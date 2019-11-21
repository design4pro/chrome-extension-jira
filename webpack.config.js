/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const ejs = require('ejs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { BuildOptimizerWebpackPlugin, buildOptimizerLoaderPath } = require('@angular-devkit/build-optimizer');
const { version } = require('./package.json');

const config = {
    mode: process.env.NODE_ENV,
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    entry: {
        'content-script/content-script': path.join(__dirname, 'src/content-script/content-script.tsx'),
        'background': path.join(__dirname, 'src/background.tsx'),
        'popup/popup': path.join(__dirname, 'src/popup/popup.tsx'),
        'options/options': path.join(__dirname, 'src/options/options.tsx'),
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    module: {
        rules: [
            /**
             * ESLINT
             * First, run the linter.
             * It's important to do this before Babel processes the JS.
             * Only testing .ts and .tsx files (React code)
             */
            {
                test: /\.([jt])sx?$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.([jt])sx?$/,
                loader: `babel-loader`,
                exclude: /node_modules/,
                options: {
                    compact: false,
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[name].[ext]',
                    outputPath: '/images/',
                    emitFile: false,
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[name].[ext]',
                    outputPath: '/fonts/',
                    emitFile: false,
                },
            },
            {
                test: /\.js$/,
                // Factory files are processed by BO in the rules added in typescript.ts.
                use: [
                    {
                        loader: buildOptimizerLoaderPath,
                        options: { sourceMap: true },
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: path.resolve(__dirname, 'tsconfig.json'),
                extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
                mainFields: ['es2015', 'module', 'main'],
            }),
        ],
    },
    performance: {
        hints: false,
    },
    plugins: [
        new BuildOptimizerWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        }),
        new webpack.DefinePlugin({
            global: 'window',
        }),
        new CopyWebpackPlugin(
            [
                { from: '_locales', to: '_locales', force: true },
                { from: 'assets', to: 'assets', force: true },
                { from: 'popup/popup.html', to: 'popup/popup.html', transform: transformHtml },
                { from: 'options/options.html', to: 'options/options.html', transform: transformHtml },
                {
                    from: 'manifest.json',
                    to: 'manifest.json',
                    transform: content => {
                        const jsonContent = JSON.parse(content);
                        jsonContent.version = version;

                        if (config.mode === 'development') {
                            jsonContent['content_security_policy'] =
                                "script-src 'self' 'unsafe-eval'; object-src 'self'";
                        }

                        return JSON.stringify(jsonContent, null, 2);
                    },
                },
            ],
            { context: 'src' }
        ),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
    },
};

if (config.mode === 'production') {
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
    ]);

    config.optimization = {
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                cache: true,
                terserOptions: {
                    ecma: 6,
                    safari10: true,
                    output: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        ascii_only: true,
                        comments: false,
                        webkit: true,
                    },
                },
            }),
        ],
        runtimeChunk: true,
    };
}

if (process.env.HMR === 'true') {
    config.plugins = (config.plugins || []).concat([
        new ExtensionReloader({
            manifest: __dirname + '/src/manifest.json',
        }),
    ]);
}

function transformHtml(content) {
    return ejs.render(content.toString(), {
        ...process.env,
    });
}

module.exports = config;
