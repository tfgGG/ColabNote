import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import hash from "../lib/hash"
import {cat } from "../lib/cat"
import { finished } from 'stream';
//import { state } from 'fs';
axios.defaults.baseURL = "http://localhost:8000/"
Vue.use(Vuex)




export const store = new Vuex.Store({

    state:{
        user:{"idprofile": 31, 
                "school": "ererc", 
                "grade": 2,
                 "birth": "2014-08-07", 
                 "intro": "dfsbdaerb df \r\nasf asfb", 
                 "img": "/media/images.jpg", "user": 37},
        noteid: null,
        commentlist:[],
        menulist:[],
        noteinfo:null,
        field:[],
        username:'yyu',
        cat:cat
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
            console.log("mutation Add Comment")
            state.commentlist.push(obj)
            console.log(state.commentlist)
        },
        setcomment:function(state,obj){
            state.commentlist = obj
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
            console.log("Inside getnoteinfo")
            var cata =  state.cat.subject[0].field
            state.noteinfo = obj
            if(obj.field == "")
                return;
            for(var i=0;i<state.cat.subject.length-1;i++){
                console.log("FORFOR")
                console.log(cata)
                cata = cata.concat(cat.subject[i+1].field)
            }
            
            var temp = obj.field.split(',')
            temp.forEach((el)=>{
                var o = cata.find((item, index, array)=>{
                    return el == item.value
                })
                state.field.push(o)
            })
            console.log(state.field)
        }
    },
    actions:{
        setcomment:function(context,obj){
            axios.get('/upload/comment/'+ hash.dec(obj)+'/')
            .then((response)=> {
                //console.log(response.data)
                context.commit("setcomment", response.data)    
            })
            .catch(function (error) {
                console.log("Get Comment error"+ error);
            });
        },
        addcomment: function(context,obj){
            obj.note = hash.dec(obj.note)
            console.log(obj)
            axios.post('/upload/addComment/', obj)
            .then((response)=> {
                console.log("Saving Comment")
                console.log(response.data)
            })
            .catch(function (error) {
                console.log("Post Comment error"+ error);
            });
        },
        setmenulist: (context,id)=>{
            axios.get('/upload/RESTdetail/'+ hash.dec(id) + "/")
                .then((response)=> {
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
           
            axios.put('/upload/putdetail/'+ hash.dec(obj.noteid) +"/"+ obj.list_num, obj)
            .then((response)=> {
                console.log("After saving")
                //console.log(response.data)
                context.commit("savenote",response.data)       
            })
            .catch(function (error) {
                console.log("PUT Detail error"+ error);
            });
        },
        getuser:(context)=>{
            //console.log("Inside Get User")
            axios.get('/login/now/')
            .then((response)=> {
                //console.log("Getting User")
                //console.log(response.data)     
            })
            .catch(function (error) {
               // console.log("Get User error"+ error);
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
            console.log("Change Title"+     obj)
        }
    }


    })
