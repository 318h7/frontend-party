const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const getPath = (location) => path.resolve(`${__dirname}${location}`);

const environment = process.env.NODE_ENV || 'production';

const paths = {
  app: getPath('/src/index.tsx'),
  src: getPath('/src'),
  dist: getPath('/dist'),
  public: getPath('/public'),
  index: getPath('/public/index.html'),
  env: getPath(`/env/${environment}.env`),
};

const isProduction = environment === 'production';

const minifyProps = isProduction
  ? {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }
  : {};

const getHTMLPluginOptions = () => ({
  inject: true,
  template: paths.index,
  ...minifyProps,
});

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin(getHTMLPluginOptions()),
  new CopyWebpackPlugin([{ from: paths.public }]),
  new DotenvWebpackPlugin({ path: paths.env }),
];

module.exports = {
  entry: { app: paths.app },
  devtool: isProduction ? false : 'inline-source-map',
  mode: environment,
  devServer: {
    contentBase: paths.dist,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: isProduction,
            compact: isProduction,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      paths.src,
      'node_modules',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.dist,
    publicPath: '/',
  },
  plugins,
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
