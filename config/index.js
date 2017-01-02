// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    cdnHost: "//static2.xiyayungou.com",
    // cdnHost: "..",
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    assetsSubDirectory: 'static',
    proxyTable: {
      '/*/*.json?(*)*': {
        target: 'http://dev.xiyayungou.com',
        changeOrigin: true,
        logLevel: "debug",
        secure: false,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/*.json?(*)*': {
        target: 'http://dev.xiyayungou.com',
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
