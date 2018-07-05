var path = require('path')

var ip = require('ip')
var localIP = ip.address()
/**
 * 配置文件入口
 * @type {Object}
 */
module.exports = {
	appVersion: "0.10",
	build: {
		env: require('./prod.env'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: '../../',  // css和img的路径能够对应上，这个设置至关重要
		assetsSubDirectory: 'static',
		productionSourceMap: false,
		productionGzip: true,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: 'http://' + localIP + ':8080/',
		assetsSubDirectory: '',
		port: 8080,
		developmentSourceMap: true
	},
	workingDir: process.cwd(),
	localAddress: 'http://' + localIP + ':8080'
}