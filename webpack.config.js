const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const withReport = process.env.npm_config_withReport;
module.exports = {
  plugins: [
    // other plugins
    withReport ? new BundleAnalyzerPlugin() : '',
  ],
  entry: './app.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 250000,
    },
  },
};