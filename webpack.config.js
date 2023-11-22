// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const fs = require('fs');

const stylesHandler = 'style-loader';

function produceEntryArray() {
    const output = {};
    const files = fs.readdirSync(path.join(__dirname, 'src'));
    files.filter(file => file.endsWith('.js')).forEach(file => {
        output[file.slice(0, file.length - 3)] = `./src/${file}`;
    });
    return output;
}

const config = {
    entry: produceEntryArray(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new WebpackCopyPlugin({
            patterns: ['package.json'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, {loader: MiniCssExtractPlugin.loader}, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
