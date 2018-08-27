import Vue from 'vue'
import Vuex from 'vuex'
import db from '../lib/getdata'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{
        user: db.getuser(),
        commentlist:db.getcomment(),
    },
    mutations:{
    
    }



})

