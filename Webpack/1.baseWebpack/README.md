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
"dev": "webpack-dev-server --env.development --config ./build/webpack.base.js --open",
"dev:build": "webpack --env.development --config ./build/webpack.base.js",
"build": "webpack --env.production --config ./build/webpack.base.js",
```

##  插件使用

- <b>webpack-merge</b>如果想要dev文件和prod文件和base合并，可以使用此插件<b>npm i webpack-merge --save-dev</b>循环后面的配置，定义到前面去
- <b>webpack-dev-server</b>webpack开发服务<b>npm i webpack-dev-server --save-dev</b>把packjson命令改写成webpack-dev-server
- <b>html-webpack-plugin</b>根据指定模板html文件自动生成html文件并且引入打包后的js内容<b>npm i html-webpack-plugin --save-dev</b>
- <b>clean-webpack-plugin</b>清空某个目录<b>npm i clean-webpack-plugin --save-dev</b>
- <b>css-loader style-loader</b>处理css，需要两个loader，css-loader会解析css语法，并且会把解析后的结果传递给style-loader，style-loader会将解析的css，变成style标签插入到页面当中<b>此时应该注意，loader有执行顺序，从下到上，从右边到左边</b>，<b>npm i css-loader style-loader --save-dev</b>
- <b>node-sass,sass-loader</b>如果使用了css预处理器sass<b>npm i node-sass sass-loader --save-dev</b>此时的sass-loader在webpack中主要是匹配scss文件传递给node-sass来处理
- <b>less,less-loader</b>如果使用了css预处理器less<b>npm i less less-loader --save-dev</b>这里有一个坑点，假如在js中引入了css，css文件中又引入了同scss名的css，同scss名的css又引入的同scss名的scss，则此scss不会被解析。避免就是不要混合写，混合写的话不要同名。还有就是看webpack.base.js使用options传递参数给loader
- <b>postcss-loader autoprefixer</b>可以给自动给样式添加前缀<b>npm i postcss-loader autoprefixer --save-dev</b>需要写一个<b>postcss.config.js</b>配置文件。配置覆盖多少浏览器百分率<b>.browserslistrc</b>则要填写一个这个文件
- <b>mini-css-extract-plugin</b>css可以和js 一同加载。<b>npm i mini-css-extract-plugin --save-dev</b>在生产环境下使用，并且注意这个还有插件的使用,用来生成对应生产环境的css文件名.
- <b>optimize-css-assets-webpack-plugin</b>用来打包压缩css成一行<b>npm i optimize-css-assets-webpack-plugin --save-dev</b>不过要注意安装了次插件并声明压缩css代码，则js代码也要手动压缩。<b>terser-webpack-plugin</b>
