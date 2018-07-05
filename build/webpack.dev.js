let process = require('process')
process.env.NODE_ENV = 'development'
process.traceDeprecation = true

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const apiMocker = require('webpack-api-mocker');
const isMock = true;

const port =8080

process.on('uncaughtException', function(exception) {
    console.log('捕获到的异常是:', exception);
});

var pageEntry = utils.getEntries(utils.getPages('/public'), true);

var webpackConfig = {

    entry: pageEntry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://localhost:'+port+'/',
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
            "utils": path.join(__dirname, '/../src/utils')
        },
        modules: [path.join(__dirname, '../node_modules')]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        hot:true,
        port: port,
        contentBase: [path.resolve(__dirname, '../dist')],
        before: function (app) {
            if (isMock) {
                apiMocker(app, path.join(__dirname, '../mock/mock.config.js'), {
                    proxy: {
                        '/api/*': 'http://www.daoyu8.com/',
                    },
                    changeHost: true,
                })
            }

        }
        // proxy: {
        //     '/api': {
        //         target: 'http://180.97.232.18',
        //         headers:{ "Host": "user.sdo.com" },
        //         secure: false,
        //         changeOrigin: true
        //     }
        // }
    },

    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use:[
                {loader:'babel-loader'}
            ]
            //loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=es2015']
        }, {
            test: /\.rt/,
            use: 'react-templates-loader'
        }, {
            test: /\.(png|jpeg|jpg|gif|svg)$/,
            use: [{
                    loader:'url-loader',
                    options:{
                        name:'img/[name].[ext]',
                        limit: 1
                    }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                    loader:'url-loader',
                    options:{
                        limit: 1
                    }
            }]
        },{
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options:{
                    sourceMap: true
                }
            }]
        },{
            test: /\.scss$/,
            use:[{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options:{
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
        }]
    },

    // externals: {
    //     //'react': 'React',
    //     //'react-dom': 'ReactDOM',
    //     'fetch-ie8': 'fetch',
    //     'redux': 'Redux',
    //     //'react-router': 'ReactRouter',
    //     'redux-thunk': 'ReduxThunk',
    //     'redux-logger' : 'reduxLogger',
    //     //'react-redux': 'ReactRedux',
    //     'redux-simple-router': 'ReduxSimpleRouter'
    // },

    plugins: [

        new webpack.LoaderOptionsPlugin({
           debug: true,
            context: __dirname
        }),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'base',
            minChunks: Infinity
        }),

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

module.exports = webpackConfig