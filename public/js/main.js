require('bootstrap/dist/css/bootstrap.min.css');

import Vue from 'vue'
import comment from '../../views/layouts/comment.vue' 
import info from '../../views/layouts/info.vue' 
new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
      message: 'Hello Vue!'
    },
    components:{
        comment:comment,
        info:info
    }
})