import Vue from 'vue'
import Vuex from 'vuex'
import db from '../lib/getdata'
//import { state } from 'fs';

Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{
        user: db.getuser(),
        noteid: "",
        commentlist:[],
        //detail: db.getdetail()
    },
    mutations:{
        addcomment:function(state,obj){
            console.log("m")
            console.log(obj)
            state.commentlist.push(obj[0])
        },
        setcomment:function(state,id){
            //console.log(state.detail)
        },
        setnoteid:function(state,id){
            state.noteid = id;
        }
    },
    actions:{
        addcomment:  function(context,obj){
            context.commit("addcomment",obj)
            db.postcomment(context.noteid,obj)
        }
    }

})

