require('shelljs/global')
process.env.NODE_ENV = 'production'

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// var SpritesmithPlugin = require('webpack-spritesmith')
var pageEntry = utils.getEntries(utils.getPages('/public'), false);
var productionGzip = true;
var productionGzipExtensions = ['js', 'css'];
var timestamp = Date.parse(new Date());

const extractSass = new ExtractTextPlugin({
    filename:'[name]/bundle-[chunkhash].min.css'
});

const extractCss = new ExtractTextPlugin({
    filename:'[name]/bundle-[chunkhash].min.css'
});

var webpackConfig = {

	entry: pageEntry,

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: ' /p/',
        filename: 'p/[name]/bundle-[chunkhash].min.js',
        chunkFilename: 'p/chunk/[name]/[chunkhash].chunk.js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            'assets': path.join(__dirname, '/../src/assets'),
            'components': path.join(__dirname, '/../src/components'),
            'routes': path.join(__dirname, '/../src/routes'),
            'views': path.join(__dirname, '/../src/views'),
            "utils": path.join(__dirname, '/../src/utils')
        },
        modules: [path.join(__dirname, '../node_modules')]
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.jsx|js$/,
            exclude: /(node_modules|bower_components)/,
            use:[
                {loader:'babel-loader'}
            ]
        }, {
            test: /\.rt/,
            use: 'react-templates-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                    loader:'url-loader',
                    options:{
                        name:'[path][name]-[hash:7].[ext]',
                        limit: 3072
                    }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                    loader:'url-loader',
                    options:{
                        name:'[path][name]-[hash:7].[ext]',
                        limit: 1
                    }
            }]
        },{
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader?minimize",
                options:{
                    sourceMap: true
                }
            }]
        },{
            test: /\.scss$/,
            use:[{
                    loader: "style-loader"
                }, {
                    loader: "css-loader?minimize",
                    options:{
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader?minimize",
                    options: {
                        sourceMap: true
                    }
                }]
        }]
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'base',
            minChunks: Infinity
        }),

        extractSass,

        extractCss,

        new webpack.optimize.ModuleConcatenationPlugin(),

        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static'),
              to: 'static',
              ignore: ['.*']
            }
        ])
    ]

}

var htmlWebpackPlugins = [] // 多html对应多个js入口文件

Object.keys(pageEntry).forEach(function (name, i) {
 // https://github.com/ampedandwired/html-webpack-plugin
 htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: name + '.html',
        template: './public/' + name + '/app.html',
        chunks: [name,"base"],
        inject: true
    }))
})

webpackConfig.plugins = webpackConfig.plugins.concat(htmlWebpackPlugins)

if (productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

rm('-rf', path.resolve(__dirname, '../dist'))

module.exports = webpackConfig