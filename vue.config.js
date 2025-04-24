module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/down-syndrome-research-manager/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
