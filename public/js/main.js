require('bootstrap/dist/css/bootstrap.min.css');

import Vue from 'vue'
import comment from '../../views/layouts/comment.vue' 
import info from '../../views/layouts/info.vue' 
import {store} from '../../store/store'

new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    store: store,
    data: {
      message: 'Hello Vue!'
    },
    components:{
        comment:comment,
        info:info
    }
})