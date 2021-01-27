const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    inline: true,
  },
  plugins: [
    // new PrettierPlugin(),
    new StylelintPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(jsx?|tsx?)$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: true },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
