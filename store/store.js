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
        addcomment:function(state,obj){
            console.log("m");
            console.log(obj);
            state.commentlist.push(obj[0]);
        }
    
    },
    actions:{
        addcomment:function(context,obj){
            setTimeout(function(){
                context.commit("addcomment",obj)
                console.log("actions:"+obj);
            },2000);
        }
    }


})

