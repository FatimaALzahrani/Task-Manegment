module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "assets",
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
};
