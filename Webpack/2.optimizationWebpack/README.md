Webpack的优化
---

## 安装依赖包、初始化项目

```bash
npm init -y 
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader mini-css-extract-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react file-loader --save-dev
npm i react react-dom --save
```

* webpack 主要用于打包
* webpack-cli 主要用于解析我们命令行参数
* webpack-dev-server 主要用于我们开发服务
* html-webpack-plugin 打包成html
* css-loader 打包css代码
* style-loader 主要用于用style标签插入到html中
* mini-css-extract-plugin 抽离css样式、用link标签引入
* babel-loader js转译功能
* @babel/core js转化同时需要
* @babel/preset-env 将es6转化es5
* @babel/preset-react 将我们的react jsx语法转化成为js代码
* file-loader 将图片等资源不打包为base64，使用路径

##  配置命令(package.json)

```bash
  "dev": "webpack-dev-server --env=development",
  "dev:build": "webpack --env=development",
  "build": "webpack --env=production",
```
* env传入给文件的参数

# webpack中的各种优化

##  <purgecss-webpack-plugin>删除无用的Css样式(注意如果在项目中有使用动态更改添加样式的话，请不要使用)
* 我们希望在生产环境下删除掉没有使用过的css样式
* <code>npm i purgecss-webpack-plugin glob --save-dev</code> gload此时为搜索作用，查找匹配的文件,返回路径
* 配置：

```JavaScript
/* ------1.删除无用css */
const glob = require('glob'); 
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin');

new PurgeCssWebpackPlugin({
        paths: glob.sync('./src/**/*', {nodir: true})
      })
```

##  <image-webpack-loader>图片压缩插件
* loader的执行顺序是从下到上，从右到左。我们希望在file-loader之前使用图片压缩。降低分辨率和清晰度。
* <code>npm i image-webpack-loader --save-dev</code>
* 配置：
```JavaScript
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
```

##  CDN加载文件
* 如果在html引入cdn的话就相当于全局引入。如果我们在js代码中使用import的方式的话会把代码库一起打包进去最终文件中。现在我们希望我们既可以使用import又不把代码库打包进去最终文件。

* 配置

```JavaScript
 externals:{     //外部扩展
      'jquery': '$' //不去打包代码import中的jquery
    },
```

* 管理cdn资源的webpack插件：add-asset-html-cdn-webpack-plugin
* 配置

```JavaScript
 new AddCdnPlugin(true, {
        'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
      })
```
