const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js/,
          use: {
            // cacheDirectory 设置编译缓存，避免在每次执行时，可能产生的、高性能小号的Babel重新编译过程
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: ['env']
            }
          },
          exclude: /(node_modules)/,
        },
        {
          test: /\.css/,
          use: [
            {
              loader: 'style-loader',
              options: {
                name: '[name].[ext]',
              }
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)/,
          use: [
            // { // loader 引用是从上到下，从右到左
            //   loader: 'url-loader',
            //   // base 64无放入background-url
            //   options: {
            //     limit: 2,
            //   }
            // },
            {
              // 默认打包路径为output路径
              loader: 'file-loader',
              options: {
                // 此处name俩个作用
                // 1. 可以指定打包出来的路径
                // 2. 替代原文件应用
                name: '[name].[ext]',
                // 在默认打包路径下指定图片文件的存放目录
                outputPath: '../dist/assets/',

                // 图片打包最终解决方案 修改name的前缀（默认打包地址）
                // name: './dist/[name].[ext]',

              }
            },
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './html/index.tpl.html',
        filename: './dist/index.html',
        // inject: true,
        // favicon: './assets/favicon.png',
        // minify: {
        //   removeComments: true
        // },
        // // chunks: [], //默认应锁所有JS文件
        // hash: false,
        // cache: true,
        // chunksSortMode: 'dependency', // script标签的引用顺序，

      }),
    ]
}