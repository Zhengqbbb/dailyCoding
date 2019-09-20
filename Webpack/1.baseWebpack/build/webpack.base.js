const dev = require('./webpack.dev.js');
const prod = require('./webpack.prod.js');
const path = require('path');
module.exports = (env) =>{//env环境变量
  let isDev = env.development;//是不是开发环境
  const base = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist')
    }
  }
  if(isDev){

  }else{
     
  }
}