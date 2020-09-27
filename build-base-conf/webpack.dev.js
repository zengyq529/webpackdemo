
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common');
const path = require('path');
const { DllReferencePlugin } = require('webpack');
const {srcPath,distPath} = require('./path')
module.exports = merge(common, {
    mode: 'development',
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:3000', //热更配置
            'webpack/hot/only-dev-server',
            path.join(srcPath, 'index'),
        ],
    },
    module: {
        rules: [
            {   //prod里面启用HappyPack 多进程打包 （只是用来写demo测试也可以不用！）
                test: /\.js$/,
                loader: ['babel-loader?cacheDirectory'],
                include: srcPath, //提高效率 ，cacheDirectory
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, //css-loader 解析import进来的css模块。style-loader来插入到页面中，loader顺序从后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader'], //postcss浏览器兼容性
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(), //热更插件
        new DllReferencePlugin({ //告诉 react 动态链接库文件内容。
            manifest: require(path.join(distPath,'react.mainfest.json'))
        })
    ],
    devServer: {
        port: 3000,
        progress: false,
        //contentbase:distPath, 根目录
        open: true, //自动打开浏览器
        compress: true,//启动gzip压缩。
        hot: true, //开启热更。
        // proxy:{
        //     '/api'
        // }
    },
})