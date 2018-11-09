var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
//var babelpolyfill = require("babel-polyfill");
module.exports = {
  entry: {
    Editor:'./views/Editor/main.js',
    Planner:'./views/Planner/main.js'
  },
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: '[name].bundle.js'
  },
  module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i, 
          loader: "file-loader?name=/public/img/[name].[ext]"
        },
       {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
           test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
           use: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
           test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
           use: 'file-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
   ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [

    new VueLoaderPlugin()
  ]
}