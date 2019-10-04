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

### 命宁使用
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

- <b>webpack-merge</b> ，如果想要dev文件和prod文件和base合并，可以使用此插件 <code>npm i webpack-merge --save-dev</code> 循环后面的配置，定义到前面去
- <b>webpack-dev-server</b> ，webpack开发服务<code>npm i webpack-dev-server --save-dev</code>把packjson命令改写成webpack-dev-server
- <b>html-webpack-plugin</b> ，根据指定模板html文件自动生成html文件并且引入打包后的js内容<code>npm i html-webpack-plugin --save-dev</code>
- <b>clean-webpack-plugin</b>，清空某个目录<code>npm i clean-webpack-plugin --save-dev</code>

---

- <b>css-loader style-loader</b>，处理css，需要两个loader，css-loader会解析css语法，并且会把解析后的结果传递给style-loader，style-loader会将解析的css，变成style标签插入到页面当中<b>此时应该注意，loader有执行顺序，从下到上，从右边到左边</b>，<code>npm i css-loader style-loader --save-dev</code>
- <b>node-sass,sass-loader</b>，如果使用了css预处理器sass<code>npm i node-sass sass-loader --save-dev</code>此时的sass-loader在webpack中主要是匹配scss文件传递给node-sass来处理
- <b>less,less-loader</b>，如果使用了css预处理器less<code>npm i less less-loader --save-dev</code>这里有一个坑点，假如在js中引入了css，css文件中又引入了同scss名的css，同scss名的css又引入的同scss名的scss，则此scss不会被解析。避免就是不要混合写，混合写的话不要同名。还有就是看webpack.base.js使用options传递参数给loader
- <b>postcss-loader autoprefixer</b>，可以给自动给样式添加前缀<code>npm i postcss-loader autoprefixer --save-dev</code>需要写一个<b>postcss.config.js</b>配置文件。配置覆盖多少浏览器百分率<b>.browserslistrc</b>则要填写一个这个文件
- <b>mini-css-extract-plugin</b>，css可以和js 一同加载。<code>npm i mini-css-extract-plugin --save-dev</code>在生产环境下使用，并且注意这个还有插件的使用,用来生成对应生产环境的css文件名.
- <b>optimize-css-assets-webpack-plugin</b>，用来打包压缩css成一行<code>npm i optimize-css-assets-webpack-plugin --save-dev</code>不过要注意安装了次插件并声明压缩css代码，则js代码也要手动压缩。<b>terser-webpack-plugin</b>

---

- <b>file-loader</b>，可以当前图片拷贝到dist文件下并且把拷贝后的结果返回给调用者，调用者再去引这个结果就可以找到。默认的功能就是拷贝<code>npm i file-loader -D</code>
- <b>url-loader</b>，配合file-loader在图片多少大小以上使用url-loader，多少大小以下使用file-loader，转base64<code>npm i url-loader -D</code>

---

- <b>terser-webpack-plugin</b>，用来压缩js成一行<code>npm i terser-webpack-plugin -D</code>
- <b>@babel/core</b>，babel的核心模块，
- <b>@babel/preset-env</b>，babel预设，包含的所有的es6转换为es5
- <b>babel-loader</b>，是和webpack的桥梁，默认会去调用babel/core，然后babel/core回去调用babale/preset-env来解析es6转换为es5，如果我们如果卸载base之中的配置信息的话会有点多，我们可以写一个<b>.babelrc</b>默认会去调用这个.babelrc文件就是options之中的配置项<code>npm i @babel/core @babel/preset-env babel-loader -D</code>
- <b>@babel/plugin-proposal-class-properties</b>，解析类的属性，解析es6高级一点的语法class等等，单单一个插件可以写在.babelrc文件，loose表示是否要使用宽松模式
- <b>@babel/plugin-proposal-decorators</b>，解析装饰器，当我们在项目当使用了类装饰器等高级语法，要在他执行之前使用，如果我们要保存装饰器的语法，需要添加<b>legacy: true</b>
- <b>core-js@2</b>，babel默认不会转换一些高级一点的api他认为浏览器会自带的，此时我们需要改写一下@babel/preset-env在.babelrc中的写法传入参数"useBuiltIns": "usage"，提示自动转换按需加载，这比babel-polyfill不会污染全局，并且导入包可以按需，可是此时要门需要下载一个类似补丁core-js@2或者core-js@3<code>npm i core-js@2 -D</code>
- <b>@babel/plugin-transform-runtime</b>，转换的运行时,可以帮我们注入一些帮助函数，去节约代码（假如我们在a.js中使用的class，在index.js中使用了class语法，那么class语法编译的代码只有一次，减少代码的冗余）。同时要注意这个包需要依赖一个，<b>@babel/runtime</b>，用来手动解析代码。plugin-transform-runtime会自动去调用runtime，在.babelrc中配置<code>npm i @babel/plugin-transform-runtime -D</code><code>npm i @babel/runtime --save</code>

## 解析React
- 环境<code>npm i react react-dom --save</code>，还需要一个插件的集合用来解析react，<code>npm i @babel/preset-react -D</code>，写在.babelrc文件中应该注意顺序，先解析react，再转换为es5.
- <b>@babel/preset-typescript</b>，babel对ts语法解析做的插件库<code>npm i @babel/preset-typescript -D</code>在base配置中要改入口文件和rules校验tsx语法，然后在.babelrc文件中先把ts转换为js再转换为es5
- <b>typescript</b>，不过我们真的要用typescript校验我们的代码符不符合规范的话，就要使用typescript。不过此时就需要安装@types/react @type/react-dom --save提示行文件，这样每一行代码都有提示效果

## 解析Vue
- 环境<code>npm i vue --save</code>Vue文件我们也需要安装对应的模块来解析，<b>vue-loader 和 vue-template-compiler</b>，<code>npm i vue-loader vue-template-compiler -D</code>。然后在base配置中使用vue-loader去调用这些文件解析
- 如果我们要使用ts来解析Vue文件需要一个垫片<b>vue-shims.d.ts</b>,用来声明.vue文件是什么类型的
- 如果我们在Vue文件中还需要些TS。如在script标签之中lang="ts"。Vue属性的装饰器写法，<b>vue-property-decorator</b><code>npm i vue-property-decorator --save</code>，还需要在.babelrc文件中对"@babel/preset-typescript"进行改写为所有的.vue文件去进行ts编译
