require('shelljs/global')
var process = require('process')
process.env.NODE_ENV = 'production'

var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base')
var config = require('../config').build
// var SpritesmithPlugin = require('webpack-spritesmith')

rm('-rf', path.resolve(__dirname, '../dist'))

module.exports = webpackMerge(webpackBaseConfig, {
    output: {
        path: config.assetsRoot ,
        publicPath: config.assetsPublicPath,
        filename: 'p/[name]/bundle-[chunkhash].min.js',
        chunkFilename: 'p/chunk/[name]/[chunkhash].chunk.js'
    },

    devtool: 'source-map',

    mode: 'production',

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: true
        //     }
        // }),

        new webpack.optimize.ModuleConcatenationPlugin(),

    ]
})