const path = require("path");

module.exports = {
  mode: "development", // hoặc 'production' khi build release
  entry: "./src/index.jsx", // entry chính của bạn
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // cần thiết nếu dùng React Router
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  devtool: "source-map", // source map cho debug
  module: {
    rules: [
      // Babel để biên dịch JSX / JS hiện đại
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // SCSS / CSS
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // Source map loader (bỏ qua AJV để không warning)
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules\/ajv/,
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "public"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
