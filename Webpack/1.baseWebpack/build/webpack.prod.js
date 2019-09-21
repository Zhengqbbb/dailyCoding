const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',
  optimization: { //优化项
    minimizer: [ //可以放置压缩方案
      new optimizeCSSAssetsPlugin(), //用了这个js也得手动压缩
      new TerserWebpackPlugin()
    ]//TODO: npm i optimize-css-assets-webpack-plugin --save-dev
    // npm i terser-webpack-plugin -D
  }
}