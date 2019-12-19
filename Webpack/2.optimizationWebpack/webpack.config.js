const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* ------删除无用css */
const glob = require('glob'); 
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin');
/* -----管理cdn资源 */
const AddCdnPlugin = require('add-asset-html-cdn-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    externals:{     //外部扩展
      'jquery': '$' //不去打包代码中的jquery
    },
    module: {
      rules: [{
          test: /\.js/,
          use: {
            loader: 'babel-loader',
            options: { // .babelrc
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ]
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif)/,
          use: [
            {
              loader: 'file-loader'
            },
            {
              loader: 'image-webpack-loader',
              //选项
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                //是否禁用png压缩
                optipng: {
                  enabled: false,
                },
                //quality 清晰度
                pngquant: {
                  quality: [0.65, 0.90],//
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                // 优化值
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            env !== 'delopment' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      env !== 'delopment' && new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new PurgeCssWebpackPlugin({
        paths: glob.sync('./src/**/*', {nodir: true})
      }),
      new AddCdnPlugin(true, {
        'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
      })
    ].filter(Boolean)
  }
}