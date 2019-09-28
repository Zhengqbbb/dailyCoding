const dev = require('./webpack.dev.js');
const prod = require('./webpack.prod.js');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env) => { //env环境变量
  let isDev = env.development; //是不是开发环境
  const base = {
    entry: path.resolve(__dirname, '../src/index.js'),
    module: {
      //转化什么文件，用什么来转，使用哪些loader
      //定义一些规则来定义转什么文件
      //这里就涉及一些loader的写法，可以使用数组的方式多个loader，字符串一个loader，对象需要传递参数
      rules: [{
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: { //给loader传递参数
                //如果css文件引入其他文件@import 则调用往后一个loader处理
                importLoaders: 2
              }
            }, 'postcss-loader', 'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(woff|ttf|eot)$/,
          use: 'file-loader'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              //name: "image/[name].[ext]",
              name: "image/[contentHash].[ext]",
              limit: 1024
            }
          }
        },
        {// 解析js文件，默认会调用@babel/core，然后调用.babelrc文件
          test: /\.js$/,
          use: 'babel-loader'
        }
      ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist')
    },
    plugins: [
      //如果是开发模式就不要抽离样式
      !isDev && new MiniCssExtractPlugin({
        filename: 'css/main.css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), //模板
        filename: 'index.html', //生成模板名
      })
    ].filter(Boolean)
  }
  if (isDev) {
    return merge(base, dev);
  } else {
    return merge(base, prod)
  }
}