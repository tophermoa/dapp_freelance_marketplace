import webpack            from 'webpack'
import path               from 'path'
import HtmlWebpackPlugin  from 'html-webpack-plugin'

// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    stats: 'errors-only', // Display only errors to reduce the amount of output.
    host: process.env.HOST, // Defaults to `localhost`
    port: '3000', // Defaults to 8080
    open: true, // Open the page in browser
    historyApiFallback: true,
    // proxy: {
    //   '/api/**': 'http://localhost:8080'
    // }
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  },

  module: {
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')],
    rules: [{
      test: /\.s?css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[hash:base64:5][path]-[local]'
          }
        },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: '@import "config-styles.scss";',
            includePaths: [
              path.join(__dirname, '..', '/src/configs/theme')
            ]
          }
        }
      ]
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      __DEVELOPMENT__: true
    }),
    new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
