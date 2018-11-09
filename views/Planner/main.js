//require('bootstrap/dist/css/bootstrap.min.css');

import Vue from 'vue'
import App from './App.vue'


new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
      message: 'Hello Vue!'
    },
    render: h => h(App)
})

