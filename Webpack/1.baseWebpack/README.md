## 初始化webpack

### 安装

```bash
npm init -y
npm install webpack webpack-cli --save-dev 
```

- webpack-cli可用于用户传递参数给webpack

### 初步使用
- 直接打包可以使用npx webpack的命宁(npm5.2)
- npx webpack --mode development (直接在开发环境下打包)

### 改写命宁
- 在package.json中传递环境env变量，webpack不仅可以导出对象，也可以导出函数，函数的参数为env
- package.json中填写

```bash
"dev": "webpack --env.development",
"build": "webpack --env.production",
```

### 配置文件
- webpack.config.js ，webpack是基于nodejs 语法就是commonjs规范
- 一般情况下我们都会分成两个模式 一个开发模式，一个生产模式，还有一个基本配置，增加一个文件夹build专门放于打包配置
- 可以分开config到各自的文件，然后两个文件引入base。也可以config到base，由base引入到各自的文件
- 此时指定路径，改写package.json中填写

```bash
"dev": "webpack --env.development --config ./build/webpack.base.js",
"build": "webpack --env.production --config ./build/webpack.base.js",
```
