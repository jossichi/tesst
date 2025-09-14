// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Tìm rule của source-map-loader
      const sourceMapRule = webpackConfig.module.rules.find(
        (rule) => rule.loader && rule.loader.includes("source-map-loader")
      );

      if (sourceMapRule) {
        // Thêm exclude để bỏ qua node_modules
        sourceMapRule.exclude = [
          ...(sourceMapRule.exclude || []),
          /node_modules/,
        ];
      }

      return webpackConfig;
    },
  },
};
