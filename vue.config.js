module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/task-manegment-6krw/" : "/",
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
