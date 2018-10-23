import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import hash from "../lib/hash"
import db from '../lib/getdata'
//import { state } from 'fs';

Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{
        user: db.getuser(),
        notelist: {},
        commentlist:[],
        menulist:[],
        //detail: db.getdetail()
    },
    getters: {
        menulist: state => {
            return state.menulist
        }
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
        },
        setmenulist:(state,obj)=>{
             //obj is a list
            obj.forEach(el => {
                el.idnote_list = hash.hashes(el.idnote_list)
                el.noteid = hash.hashes(el.noteid)
            })
            state.menulist = obj
            console.log("Mutation Menu"+ obj);
        },
        addmenulist:function(state,obj){
            obj.idnote_list = hash.hashes(obj.idnote_list)
            obj.noteid = hash.hashes(obj.noteid)
            state.menulist.push(obj)
        }
    },
    actions:{
        addcomment: function(context,obj){
            context.commit("addcomment",obj)
            db.postcomment(context.noteid,obj)
        },
        setmenulist: (context,id)=>{
            axios.get('/upload/RESTdetail/'+ hash.dec(id) + "/")
                .then((response)=> {
                console.log("In ")
                context.commit("setmenulist",response.data)
                //context.menulist = response.data                   
                })
                .catch(function (error) {
                    console.log("Get Detail error"+ error);
                });
        },
        addmenulist:(context,obj)=>{
            axios.post('/upload/addnotedetail/', obj)
            .then((response)=> {
                console.log(response.data)
                context.commit("addmenulist",response.data)       
            })
            .catch(function (error) {
                console.log("Post Detail error"+ error);
            });
        },
        changetitle:(context,obj)=>{
            console.log("Change Title"+ obj)
        }
    }


    })
