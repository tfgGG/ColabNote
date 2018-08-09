var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: ['./public/js/client.js'], // 在 index 檔案後的 .js 副檔名是可選的
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: 'bundle.js'
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
   ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}