import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import hash from "../lib/hash"
import { finished } from 'stream';
//import { state } from 'fs';
axios.defaults.baseURL = "http://localhost:8000/"
Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{
        user: {},
        noteid: null,
        commentlist:[],
        menulist:[],
        noteinfo:null
        //detail: db.getdetail()
    },
    getters: {
        menulist: state => {
            return state.menulist
        },
        /*current:state=>{
            return state.menulist.find((item, index, array)=>{
                return item.idnote_list == noteid[1]
            }).note
        }*/
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
                el.idnote_list = hash.hashes(el.noteid*100 + el.list_num)
                el.noteid = hash.hashes(el.noteid)
            })
            state.menulist = obj
            console.log("Mutation Menu"+ obj);
        },
        addmenulist:function(state,obj){
            obj.idnote_list = hash.hashes(obj.noteid*100 + obj.list_num)
            obj.noteid = hash.hashes(obj.noteid)
            state.menulist.push(obj)
        },
        savenote:function(state,obj){
            state.menulist[obj.list_num].note = obj.note
            console.log("FinishSaving")
        },
        getnoteinfo:function(state,obj){
            state.noteinfo = obj
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
        savenote:(context,obj)=>{
           
            console.log("BEFORE SAVING");
            console.log(obj)
            axios.put('/upload/putdetail/'+ hash.dec(obj.noteid) +"/"+ obj.list_num, obj)
            .then((response)=> {
                console.log("After saving")
                console.log(response.data)
                context.commit("savenote",response.data)       
            })
            .catch(function (error) {
                console.log("PUT Detail error"+ error);
            });
        },
        getuser:(context)=>{
            console.log("Inside Get User")
            axios.get('/login/now/')
            .then((response)=> {
                console.log("Getting User")
                console.log(response.data)     
            })
            .catch(function (error) {
                console.log("Get User error"+ error);
            });
        },
        getnoteinfo:(context,obj)=>{
            axios.get('/upload/note/'+ hash.dec(obj)+'/')
            .then((response)=> {
                console.log("Getting Note Info")
                console.log(response.data)  
                context.commit("getnoteinfo",response.data[0])  
            })
            .catch(function (error) {
                console.log("Get User error"+ error);
            });
        },
        changetitle:(context,obj)=>{
            console.log("Change Title"+ obj)
        }
    }


    })
