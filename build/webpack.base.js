var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var config = require('../config')

var pageEntry = utils.getEntries(utils.getPages('/public'), process.env.NODE_ENV == "development");

var webpackConfig = {
  entry: Object.assign({vendors: path.resolve(__dirname, '../static/vendor.js')}, pageEntry),
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      'assets': path.join(__dirname, '/../src/assets'),
      'components': path.join(__dirname, '/../src/components'),
      'routes': path.join(__dirname, '/../src/routes'),
      'views': path.join(__dirname, '/../src/views'),
      "utils": path.join(__dirname, '/../src/utils'),
      "actions": path.join(__dirname, '/../src/actions'),
      "reducers": path.join(__dirname, '/../src/reducers'),
    },
    modules: [path.join(__dirname, '../node_modules')]
  },
  module: {
    rules: [{
      test: /\.jsx|js$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.rt/,
      use: 'react-templates-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[path][name]-[hash:7].[ext]',
          limit: 3072
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[path][name]-[hash:7].[ext]',
          limit: 1
        }
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?minimize']
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?minimize', 'sass-loader?minimize']
      })
    }]
  },
  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity
    }),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
    }]),

    new ExtractTextPlugin({
      filename:'p/[name]/bundle-[chunkhash].min.css',
      allChunks: true
    }),
  ]
}

var htmlWebpackPlugins = [] // 多html对应多个js入口文件

Object.keys(pageEntry).forEach(function (name, i) {
  // https://github.com/ampedandwired/html-webpack-plugin
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    filename: name + '.html',
    template: './public/' + name + '/app.html',
    chunks: ['vendors', name],
    inject: true
  }))
})

webpackConfig.plugins = webpackConfig.plugins.concat(htmlWebpackPlugins)

if (process.env.NODE_ENV == "production" && config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
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

module.exports = webpackConfig