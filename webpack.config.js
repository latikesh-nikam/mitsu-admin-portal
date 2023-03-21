const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const withReport = process.env.npm_config_withReport;
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  plugins: [
    withReport ? new BundleAnalyzerPlugin() : '',
  ],
  entry: './app.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  optimization: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 250000,
    },
  },
};