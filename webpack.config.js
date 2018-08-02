var path = require('path')

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
        }
   ]
  },
}