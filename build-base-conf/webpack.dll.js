
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const { DllPlugin } = require('webpack');
const {srcPath,distPath} = require('./path')
module.exports = {
    mode: 'development', //本地模式，线上不会用这个
    entry: { //多入口 
        react: ['react', 'react-dom'],
        //index2: path.join(srcPath, 'index2'),
    },
    output: {
        filename: '[name].dll.js',
        path: distPath,
        library: '_dll_[name]' //表示输出的是第三方的库。
    },
    plugins: [
        new DllPlugin({
            name:'_dll_[name]',
            path:path.join(distPath,'[name].manifest.json')//索引，引用名称对应模块。
        })
    ],
}