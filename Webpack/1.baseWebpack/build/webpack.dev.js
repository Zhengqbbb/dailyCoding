const path = require('path');
module.exports = {
  mode: 'development',
  devServer:{ //开发服务的配置
    port: 8082,
    //compress: true, //gzip压缩开启
    contentBase: path.resolve(__dirname, '../dist'), //webpack启动服务会在dist目录下
    
  }
}