const HtmlWebpackPlugin = require("html-webpack-plugin"); // Require  html-webpack-plugin plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: __dirname + "/assets/js/main.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + "/dist", // Folder to store generated bundle
    filename: "bundle.js", // Name of generated bundle after build
    publicPath: "/" // public URL of the output directory when referenced in a browser
  },
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: [/node_modules/]
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{ loader: "css-loader" }, { loader: "sass-loader" }]
        })
      }
    ]
  },
  plugins: [
    // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html",
      inject: "body"
    }),
    new ExtractTextPlugin("styles.css") // extract css to a separate file called styles.css
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: "./src/public", //source of static assets
    port: 7700 // port to run dev-server
  }
};
