const webpack = require('webpack');
const ejs = require('ejs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { version } = require('./package.json');

const config = {
    mode: process.env.NODE_ENV,
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    context: __dirname + '/src',
    entry: {
        'content-script/content-script': './content-script/content-script.tsx',
        'background': './background.tsx',
        'popup/popup': './popup/popup.tsx',
        'options/options': './options/options.tsx',
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
                test: /\.(ts|tsx)$/,
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
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('ts-loader'),
                    },
                ],
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
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new webpack.DefinePlugin({
            global: 'window',
        }),
        new CopyWebpackPlugin([
            { from: 'assets/', force: true },
            { from: 'popup/popup.html', to: 'popup/popup.html', transform: transformHtml },
            { from: 'options/options.html', to: 'options/options.html', transform: transformHtml },
            {
                from: 'manifest.json',
                to: 'manifest.json',
                transform: content => {
                    const jsonContent = JSON.parse(content);
                    jsonContent.version = version;

                    if (config.mode === 'development') {
                        jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
                    }

                    return JSON.stringify(jsonContent, null, 2);
                },
            },
        ]),
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
