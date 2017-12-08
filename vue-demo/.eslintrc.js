// https://eslint.org/docs/user-guide/configuring

module.exports = {
	//此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',
  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    sourceType: 'module'
  },
  //此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果使用vs-code应该可以避免出错
  extends: 'standard',
  // required to lint *.vue files
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
  plugins: [
    'html'
  ],
  // add your custom rules here
  // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin- 
  // 在rules中每个配置项后面第一个值是eslint规则的错误等级。
  // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
  // "off" -> 0 关闭规则
  // "warn" -> 1 开启警告规则		违反规则会警告（不会影响项目运行） 
  //"error" -> 2 开启错误规则		违反规则会报错（屏幕上一堆错误代码~）
  'rules': {
    // allow paren-less arrow functions	允许箭头函数参数使用括号
    'arrow-parens': 0,
    // allow async-await	允许方法之间加星号，如function * generator() {}.这是ES6提供的生成器函数
    'generator-star-spacing': 0,
    // allow debugger during development	允许在开发环境下使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
