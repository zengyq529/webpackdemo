
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const {srcPath,distPath} = require('./path')
 
module.exports = {
  entry: { //多入口 
    index: path.join(srcPath, 'index'),
    //index2: path.join(srcPath, 'index2'),
  },
  output: {
    filename: 'bundle.[hash].js',
    path: distPath,
     //  publicPath:'cdn域名'
  },
  module: {
    noParse:[/react\.min\.js$/], //引入 但是不走构建打包 就是不走 babel-loader 之类的。
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: ['babel-loader?cacheDirectory'],
      //   include:srcPath, //提高效率 ，cacheDirectory
      //   exclude: /node_modules/,
      // },


      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,//小于5k 用转 base64产出
            outputPath:'.img',
          //  publicPath:'cdn域名'
          },

        }
      },
    ]
  },
  plugins: [

    //多入口 生产index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['index','common'], //vendor','common' 是 split 里面 name 的trunk
      //只因用index1 (如果不写的话 会引入所有js文件)
    }),

    //多入口 生产index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index2.html'),
      filename: 'index2.html',
      chunks: ['index2','common'], //只因用index2
    }),

    new  webpack.IgnorePlugin(/\.\/locale/,/moment/), //直接不引入。
  ],
  optimization: {
    splitChunks: {
      chunks:'all',
      cacheGroups: { //缓存分组
        vendor: { //第三方  只要是第三方就抽离出来。
          name:'vendor', //trunk的名字
          test: /node_modules/,
          priority: 1, //越高权重越高
          minSize:0,
          minChunks:1, //最少复用次数。
        },
        //公共模块
        common: { 
          name:'common',
          minChunks: 2, //被调用2次才抽离出来
          priority: 0,
          minSize:0,
        }
      }

      
    }
  }
}