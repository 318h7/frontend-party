const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
