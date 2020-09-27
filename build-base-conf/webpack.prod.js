
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //用来抽离css文件
const TerserPlugin = require('terser-webpack-plugin')// 压缩 js
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const HappyPack = require('happypack')

//scopehosting
require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=babel',
            },
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader, //抽离而不是加载到 style
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),//每次打包前清空

        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        }),

        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory']
        }),

      

        //
        // new ParallelUglifyPlugin({
        //     // Optional regex, or array of regex to match file against. Only matching files get minified.
        //     // Defaults to /.js$/, any file ending in .js.
        //     test,
        //     include, // Optional regex, or array of regex to include in minification. Only matching files get minified.
        //     exclude, // Optional regex, or array of regex to exclude from minification. Matching files are not minified.
        //     cacheDir, // Optional absolute path to use as a cache. If not provided, caching will not be used.
        //     workerCount, // Optional int. Number of workers to run uglify. Defaults to num of cpus - 1 or asset count (whichever is smaller)
        //     sourceMap, // Optional Boolean. This slows down the compilation. Defaults to false.
        //     uglifyJS: {
        //       // These pass straight through to uglify-js@3.
        //       // Cannot be used with uglifyES.
        //       // Defaults to {} if not neither uglifyJS or uglifyES are provided.
        //       // You should use this option if you need to ensure es5 support. uglify-js will produce an error message
        //       // if it comes across any es6 code that it can't parse.
        //     },
        //     uglifyES: {
        //       // These pass straight through to uglify-es.
        //       // Cannot be used with uglifyJS.
        //       // uglify-es is a version of uglify that understands newer es6 syntax. You should use this option if the
        //       // files that you're minifying do not need to run in older browsers/versions of node.
        //     }
        //   }),



    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
    },
})