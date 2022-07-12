const path = require("path");
const devMode = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "src"),
    target:"node",
    entry: './app/index.ts',
    output: {
      path: path.resolve(__dirname, "public"),
      filename: 'index.js'
    },
    mode: 'development',
    devtool:'inline-source-map',
    module: {
      rules: [
        // typescript 
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", 
          { 
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
            },
         }],
        },
        {
          test: /vision\.wasm$/,
          type: "javascript/auto",
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        }
      ]
    },
    resolve: {
      extensions: [ '.wasm', '.css','.tsx', '.ts', '.js' ],
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: 'view/index.html'
    })
    ],
  };