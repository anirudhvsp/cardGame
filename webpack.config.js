const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'assets'),
      },
      port: 3000,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets' }
        ]
      })
    ],
    devtool: isDevelopment ? 'eval-source-map' : false
  };
};
