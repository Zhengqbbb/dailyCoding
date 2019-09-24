const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  optimization: { //优化项
    minimizer: [ //可以放置压缩方案
      new optimizeCSSAssetsPlugin(), //用了这个js也得手动压缩
      new TerserWebpackPlugin()
    ]
  },
  plugins:[
    //每次打包之前先清空文件夹
    new CleanWebpackPlugin(),
  ]
}