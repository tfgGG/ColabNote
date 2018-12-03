//require('bootstrap/dist/css/bootstrap.min.css');
import VueSession from 'vue-session'
import '../../public/css/quill.snow.css';
import Vue from 'vue'
import App from './App.vue'
import {store} from './store.js'
Vue.use(VueSession)
new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    store: store,
    data: {
      message: 'Hello Vue!'
    },
    render: h => h(App)
})

