
const path = require("path");

module.exports = {
  entry: {
    whatever: './whatever/src/index.js',
    sportsball: './sportsball/src/index.js',
    desertcatcookies: './desertcatcookies/src/index.js',
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {presets: ["@babel/env"]}
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {extensions: ["*", ".js", ".jsx"]},
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist",
    filename: '[name].bundle.js',
  },
  plugins: []
};