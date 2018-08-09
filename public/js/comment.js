import Vue from 'vue'
import comment from '../../views/layouts/comment.vue' 
new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
      message: 'Hello Vue!'
    },
    components:{
        comment:comment
    }
})