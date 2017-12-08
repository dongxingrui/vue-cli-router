'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')// 加载 webpack 配置合并工具
const baseWebpackConfig = require('./webpack.base.conf')// 加载 webpack.base.conf.js
const CopyWebpackPlugin = require('copy-webpack-plugin')
/* 一个可以插入 html 并且创建新的 .html 文件的插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* 如果我们想将 webpack 打包成一个文件 css js 分离开，那我们需要这个插件 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = require('../config/prod.env')
/* 合并 webpack.base.conf.js */
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  /* 是否使用 #source-map 开发工具，更多信息可以查看 DDFE 往期文章 */
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
  	/* 编译输出目录 */
    path: config.build.assetsRoot,
    /* 编译输出文件名 */
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [/* 使用的插件 */
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    /* 压缩 js (同样可以压缩 css) */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    /* 将 css 文件分离出来 */
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // set the following option to `true` if you want to extract CSS from
      // codesplit chunks into this main css file as well.
      // This will result in *all* of your app's CSS being loaded upfront.
      allChunks: false,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
      ? { safe: true, map: { inline: false } }
      : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /* 输入输出的 .html 文件 */
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,// 是否注入 html
      minify: {// 压缩的方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    /* 没有指定输出文件名的文件输出的静态文件名 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    /* 没有指定输出文件名的文件输出的静态文件名 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
/* 开启 gzip 的情况下使用下方的配置 */
if (config.build.productionGzip) {
	/* 加载 compression-webpack-plugin 插件 */
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
	/* 向webpackconfig.plugins中加入下方的插件 */
  webpackConfig.plugins.push(
  	/* 使用 compression-webpack-plugin 插件进行压缩 */
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
