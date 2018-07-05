var path = require('path')
var fs = require('fs')
var config = require('../config')

module.exports = {
    getEntries : function(pages, isHMR) {
        var entries = {}
        pages.map(function(page) {
            var key = page
            console.log(' ----------- ' + key)
            var value = './public/' + key + '/app.jsx'
            if (!isHMR) {
                entries[key] = value
            } else {
                entries[key] = ['react-hot-loader/patch','webpack-dev-server/client?http://localhost:'+8080, value]
            }
        })
        return entries
    },
    getPages: function(folder) {
        var pages = []
        var directories = fs.readdirSync(config.workingDir + folder)
        for (var dir of directories) {
            if (!dir.startsWith('.')) {
                pages.push(dir)
            }
        }
        return pages
    }
}