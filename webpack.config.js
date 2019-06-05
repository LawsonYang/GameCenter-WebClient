var webpack = require('webpack');
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        // 'babel-polyfill',
        // 'webpack/hot/only-dev-server',
        './src/app.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }]
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true //刷新后不报错
    }

};
