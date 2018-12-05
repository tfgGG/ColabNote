<template>
<div>
    <div class="chat">
			<div class="chatlogs">
				<div class="chat friend">
					<p class="chat-message">Start to Chat</p>	
				</div>
				<div style="width:100%;">
					<div v-for="(item,index) in list" 
						:key="index" 
						:class="{chat: true, friend: user.id != item.userid , self: item.userid == user.id }"  style="margin-top:5px;">
							<img class="user-photo" style="" v-bind:src='item.img'>
							<span class="" style="font:16px; "><b>{{item.username}}</b></span>
							<span class="" style="font:16px; color:#5e6570;">{{item.time}}</span>
							<p class="chat-message">{{item.text}}</p>	
					</div>
				</div>			
			</div>
			<div class="chat-form">
	
					<div class="">
						<input type="text" v-model="message" width="50%">
						<button @click="send" >Send</button>
					</div>
	
			</div>
    </div>
</div>    
</template>
<script>
var ClientOAuth2 = require('client-oauth2')
import $ from 'jquery'
import ShareDB from 'sharedb/lib/client';
var socket = new WebSocket('ws://'+location.hostname+":"+location.port);
var connection = new ShareDB.Connection(socket);
var mdoc;
export default {
    data(){
        return{
            list:[],
            message:"",
			status:0, // someone else push the comment
			teamid:''
        } 
	},
	computed:{
		user(){
      		return this.$store.state.user
    	},
	},
	created:function(){
		var array = window.location.pathname.split('/')
		this.teamid = array[2]
		this.$store.dispatch("GetUser",document.cookie)
 	  
	},
    mounted:function(){

      mdoc = connection.get("message",this.teamid);
      //console.log(mdoc.data.message)
      var scolist = this.list
      //const store = this.$store;
      mdoc.subscribe((err)=>{
           if (err) throw err;

        mdoc.on('op',(op)=>{
            console.log("Get OP")
            console.log("This is op message "+mdoc.data.message[0])
			this.list.push(mdoc.data.message[0])
			console.log(this.list)
            //store.commit("addcomment",cdoc.data.message[0])
         });
      });

    },
    methods:{
        send(){
			if (this.message.trim() =='') {
				return ;
			}
			var d = new Date()
            var obj = {
                text:this.message,
				userid:this.user.id,
				time: d.getHours()+":"+d.getMinutes(),
				teamid:this.teamid,
				username:this.user.username,
				img:"http://140.136.150.93/media/" + this.user.first_name
            }
            this.message=''
			this.$store.dispatch("chat",obj)
            mdoc.submitOp([{p: ['message','0'], li:obj}]);
        }
        
    }
}
</script>
<style>
.chatbox {
	width: 600px;
	min-width: 390px;
	height: 600px;
	background: #fff;
	padding: 25px;
	margin: 20px auto;
	box-shadow: 0 3px #ccc;
}

.chatlogs {
	padding: 10px;
	width: 100%;
	height: 450px;
	overflow-x: hidden;
	overflow-y: scroll;
}

.chatlogs::-webkit-scrollbar {
	width: 10px;
}

.chatlogs::-webkit-scrollbar-thumb {
	border-radius: 5px;
	background: rgba(0,0,0,.1);
}
/*
.chat {
	display: flex;
	flex-flow: row wrap;
	width: 100%;
	align-items: flex-start;
	margin-bottom: 10px;
	overflow: hidden;
}*/


.chat .user-photo {
	width: 45px;
	height: 45px;
	background: #ccc;
	border-radius: 50%;
}


.chat .chat-message {
	width: 50%;
	padding: 8px;
	height: auto;
	margin: 10px 10px 0;
	border-radius: 5px;
	color: #fff;
	font-weight: bold;
	font-size: 18px;
}

.friend .chat-message {
	background: #1adda4;
}

.self .chat-message {
	background: #1ddced;
	float: right;
	order: -1;
}

.self .user-photo{
	display: none;
}

.self span{
	display: none;
}

.chat-form {
	margin-top: 15px;
	width: 100%;
	position: fixed;
	display: flex;
	align-items: flex-start;
}


.chat-form textarea:focus {
	background: #fff;
}

.chat-form button {
	background: #1ddced;
	padding: 5px 15px;
	font-size: 30px;
	color: #fff;
	border: none;
	margin: 0 10px;
	border-radius: 3px;
	box-shadow: 0 3px 0 #0eb2c1;
	cursor: pointer;

	-webkit-transaction: background .2s ease;
	-moz-transaction: backgroud .2s ease;
	-o-transaction: backgroud .2s ease;
}

.chat-form button:hover {
	background: #13c8d9;
}

</style>
