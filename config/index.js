var path = require('path')
var localIP = "127.0.0.1"
var port = 8080

module.exports = {
	appVersion: "0.10",
	build: {
		env: require('./prod.env'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: '/', 
		assetsSubDirectory: 'static',
		productionGzip: true,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: 'http://' + localIP + ':' + port + '/',
		assetsSubDirectory: '',
		port: port,
		developmentSourceMap: true
	},
	workingDir: process.cwd(),
	localAddress: 'http://' + localIP + ':' + port
}