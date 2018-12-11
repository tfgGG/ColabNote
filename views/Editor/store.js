import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import hash from "../../lib/hash"
import {cat } from "../../lib/cat"
//import { state } from 'fs';
//axios.defaults.baseURL = "http://localhost:8000/" 
axios.defaults.baseURL = "http://140.136.150.93/"
Vue.use(Vuex)




export const store = new Vuex.Store({

    state:{
        user:null,
        noteid: null,
        commentlist:[],
        menulist:[],
        noteinfo:null,
        field:[],
        username: "XXXXXXX",
        cat:cat,
        group:[],
        plan:[],
        login: false,
        groupmessage:'default',
        chatlist:[],
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
        },
        addmenulist:function(state,obj){
            obj.idnote_list = hash.hashes(obj.noteid*100 + obj.list_num)
            obj.noteid = hash.hashes(obj.noteid)
            state.menulist.push(obj)
        },
        savenote:function(state,obj){
            console.log(state.menulist[obj.list_num-1])
            console.log(obj.note)
            state.menulist[obj.list_num-1].note = obj.note
            console.log("FinishSaving")
        },
        getnoteinfo:function(state,obj){
            console.log("Inside getnoteinfo")
            console.log(obj)
            state.noteinfo = obj
            /*
            var cata =  state.cat.subject[0].field
            if(obj.field == "")
                return;
            for(var i=0;i<state.cat.subject.length-1;i++){
                cata = cata.concat(cat.subject[i+1].field)
            }
            
            var temp = obj.field.split(' ')
            temp.forEach((el)=>{
                var o = cata.find((item, index, array)=>{
                    return el == item.value
                })
                state.field.push(o)
            })*/
            
        },
        getgroup:function(state,obj){
            state.group = obj
        },
        getplan:function(state,obj){
            state.plan= obj
        },
        changetitle:function(state,obj){
            console.log(obj)
        },
        GetUser:function(state,obj){
            state.user = obj
            console.log(state.user)
            //console.log(obj)
        },
        groupnote:function(state,obj){
            state.groupmessage = obj
        },
        getchat:function(state,obj){
            state.chatlist = obj
        },
        chat:function(state,obj){
            state.chatlist.push(obj)
        },
      
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
                console.log(response.data)
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
                console.log(response.data)
                context.commit("savenote",response.data)       
            })
            .catch(function (error) {
                console.log("PUT Detail error"+ error);
            });
        },
        GetUser:(context,obj)=>{
            console.log("Inside Get User")
            var t = obj.split('; ').find(function(element) {
                return element.includes("accesstoken") == true;
            });
            console.log(t)
            //axios.get('http://'+ location.hostname+":"+location.port+'/gettoken').then((res)=>{
                axios.get('http://'+location.hostname+ '/api/hello/',{ headers: { Authorization:"Bearer "+  t.split("=").pop()} })
                .then((response)=> {
                    console.log(response.data)
                    context.commit("GetUser",response.data[0])
                    context.dispatch('getgroup',response.data[0].id)
                
                })
                .catch(function (error) {
                   console.log("Get User Autherrize error"+ error);
                }); 
            //}).catch(function(error){
            //    console.log("GetToken error"+ error);
            //})
           
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
            axios.patch('/upload/putdetail/'+ hash.dec(obj.noteid)+"/"+ obj.list_num, {"list_text": obj.list_text})
            .then((response)=> {
                console.log("Patching Note Title")
                console.log(response.data)  
                context.commit("changetitle",response.data)  
            })
            .catch(function (error) {
                console.log("Patching Error error"+ error);
            });
        },
        getgroup:(context,obj)=>{
            console.log(context.state.user)
            axios.get('/person/Group/'+ context.state.user.id+'/')
            .then((response)=> {
                console.log("Getting Group")
                console.log(response.data)  
                context.commit("getgroup",response.data)  
            })
            .catch(function (error) {
                console.log("Get User error"+ error);
            });
        },
        getplan:(context,obj)=>{
            axios.get('/person/Plan/'+obj+'/')
            .then((response)=> {
                console.log("Getting Plan")
                console.log(response.data)  
                context.commit("getgroup",response.data)  
            })
            .catch(function (error) {
                console.log("Get User error"+ error);
            });
        },
        chat:(context,obj)=>{
            axios.post('/person/chat/'+ obj.teamid, obj)
            .then((response)=> {
                console.log("RESPONESE"+ response.data)
                //context.commit("addmenulist",response.data)       
            })
            .catch(function (error) {
                console.log("Post Detail error"+ error);
            });
        },
        getchat:(context,obj)=>{
            axios.get('/person/chat/'+ obj).then((response)=>{
                console.log(response.data)
                context.commit('getchat',response.data)
            }) .catch(function (error) {
                console.log("Post Detail error"+ error);
            });
        },
        groupnote:(context,obj)=>{
            obj.note = hash.dec(obj.note)
            var index = context.rootState.group.find((el)=> el.idgroup == parseInt(obj.group)).name
            axios.post("/upload/POST/groupnote/",obj)
            .then((response)=> {
                console.log(response.data)
                console.log(context.state.group)
                if(response.data =='No'){
                    console.log("Inside No")
                    console.log(parseInt(obj.group))
                    context.commit("groupnote",{status:false,message:'This note has been added to '+ index+' already'})       
                }else{
                    console.log(parseInt(obj.group))
                    context.commit("groupnote",{status:true, message:"Add to"+ index  +"sucessfully"})  
                }

               
            })
            .catch(function (error) {
                console.log("Put GroupNote Permission error"+ error);
            });
        }
    }


    })
