const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const jsRules = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: [
                'last 2 Chrome major versions',
                'last 2 Firefox major versions',
                'last 2 Safari major versions',
                'last 2 Edge major versions',
                'last 2 iOS major versions',
                'last 2 ChromeAndroid major versions',
              ],
            },
          },
        ],
      ],
    },
  },
};

const htmlSvgRules = {
  test: /\.(html|svg)$/,
  use: [{
    loader: 'html-loader',
    options: {
      minimize: true,
    },
  }],
};

const lessRules = {
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'less-loader',
  ],
};

const imgRules = {
  test: /\.(jpg|jpeg|png)$/,
  include: [
    path.resolve(__dirname, '../src/assets/imgs'),
  ],
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8192,
    },
  }],
};

const baseConfig = {
  mode: 'development',
  entry: {
    'quill-better-table-plus.js': ['./src/quill-better-table-plus.js'],
    'quill-better-table-plus': './src/assets/quill-better-table-plus.less',
    'demo/demo.js': './demo/js/demo.js',
  },
  output: {
    filename: '[name]',
    library: 'QuillBetterTablePlus',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist/'),
    clean: true,
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      'dist': path.resolve(__dirname, './dist'),
    },
    extensions: ['.js', '.less', '.html'],  
  },
  externals: {
    'quill': {
      commonjs: 'quill',
      commonjs2: 'quill',
      amd: 'quill',
      root: 'Quill',
    },
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [jsRules, htmlSvgRules, lessRules, imgRules],
    noParse: [
      /\/node_modules\/clone\/clone\.js$/,
      /\/node_modules\/eventemitter3\/index\.js$/,
      /\/node_modules\/extend\/index\.js$/,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'quill-better-table',
      template: './demo/demo.html',
      filename: 'demo/demo.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[id].css',
    }),

    new webpack.HotModuleReplacementPlugin({}),
  ],
  devServer: {
    host: 'localhost',
    static: {
      directory: path.join(__dirname, "./dist")
    },
    port: 8080,
    hot: false,
    open: true
  },
};

module.exports = env => {
  if (env?.minimize) {    
    const { devServer, ...prodConfig } = baseConfig;
    return {
      ...prodConfig,
      mode: 'production',
      entry: {
        'quill-better-table-plus.min.js': ['./src/quill-better-table-plus.js'],
        'quill-better-table-plus': './src/assets/quill-better-table-plus.less',
    },
      devtool: false,      
      optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
    };
  }
  
  return baseConfig;
};