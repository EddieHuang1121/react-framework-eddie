var process = require('process')
process.env.NODE_ENV = 'development'

var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var apiMocker = require('webpack-api-mocker')
var webpackBaseConfig = require('./webpack.base')
var config = require('../config').dev
var isMock = true;

process.on('uncaughtException', function(exception) {
    console.log('捕获到的异常是:', exception);
});

module.exports = webpackMerge(webpackBaseConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    output: {
        path: config.assetsRoot,
        publicPath: config.assetsPublicPath,
        filename: '[name]/bundle.js',
        chunkFilename: 'chunk/[name]/[chunkhash].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            'assets': path.join(__dirname, '/../src/assets'),
            'components': path.join(__dirname, '/../src/components'),
            'routes': path.join(__dirname, '/../src/routes'),
            'views': path.join(__dirname, '/../src/views'),
            'utils': path.join(__dirname, '/../src/utils'),
            'apis': path.join(__dirname, '/../src/apis'),
            'jsonData': path.join(__dirname, '/../src/jsonData'),
        },
        modules: [path.join(__dirname, '../node_modules')]
    },
    devServer: {
        hot:true,
        port: config.port,
        contentBase: [config.assetsRoot],
        historyApiFallback: true, // 去除hash配置
        before: function (app) {
            if (isMock) {
                apiMocker(app, path.join(__dirname, '../mock/mock.config.js'), {
                    proxy: {
                        '/api/*': {
                            target: 'http://180.97.232.18',
                            headers: {
                                "Host": "818.sdo.com"
                            },
                            secure: false,
                            changeOrigin: true
                        }
                    },
                    changeHost: true,
                })
            }
        },
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
             context: __dirname
         }),

         new webpack.HotModuleReplacementPlugin(),
 
         new webpack.NamedModulesPlugin(),
 
         new webpack.NoEmitOnErrorsPlugin(),
 
    ]
})