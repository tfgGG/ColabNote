//require('bootstrap/dist/css/bootstrap.min.css');

import Vue from 'vue'
import App from './App.vue'
import {store} from '../Editor/store'

new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    store:store,
    data: {
      message: 'Hello Vue!'
    },
    render: h => h(App)
})

