<template>
<div>
    <div class="chat">
        <div class="chatbox">
		<div class="chatlogs">
		    <div v-for="(item,index) in list" 
                :key="index" 
                :class="{chat: true, friend: item.user != user , self: item.user == user}">
                <p class="chat-message">{{item.text}}</p>	
            </div>
			<div class="chat friend">
				<div class="user-photo"></div>
				<p class="chat-message">What's up, Brother ..!!</p>	
			</div>
		</div>
		<div class="chat-form">
			<input type="text" v-model="message">
			<button @click="send">Send</button>
		</div>
	</div>

    </div>
</div>    
</template>
<script>
var ClientOAuth2 = require('client-oauth2')
import $ from 'jquery'
import ShareDB from 'sharedb/lib/client';
var socket = new WebSocket('ws://'+location.origin+':3000');
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
	created:function(){
		var array = window.location.pathname.split('/')
		this.teamid = array[2]

		/*
		var githubAuth = new ClientOAuth2({
			clientId: 'px4dL5MkF2hW6YASaBGugJG8fJYx4GHBl9U4BM0D',
			clientSecret: '3ZrXCZdgWYYuU7YR9iNJalxH90vrFbxnPdQJfvywOxQKWy5ASMuTXPYtoIUix4j7lMvR3Zaw9zmmkvO9XWBwOVr8i4HNmHVVb3HsdWZigchWFg3fiQbMZRMBdR1ee8Oc',
			accessTokenUri: 'http://localhost:8000/o/token/',
			authorizationUri: 'http://localhost:8000/o/authorize',
			redirectUri: 'http://localhost:3000/auth/github/callback',
			scopes: ['notifications', 'gist']
		})
		var uri = githubAuth.code.getUri()
        console.log("/auth/github/")
        
		 $.ajax({
			url: uri,
			type: 'GET',
			contentType : 'text/plain',
			error: function(xhr) {
				console.log(xhr)
			},
			success: function(response) {
				console.log(response)
		}
		});*/
 	  
	},
    mounted:function(){

      mdoc = connection.get("message",'h');
      //console.log(mdoc.data.message)
      var scolist = this.list
      //const store = this.$store;
      mdoc.subscribe((err)=>{
           if (err) throw err;

        mdoc.on('op',(op)=>{
            console.log("Get OP")
            console.log("This is op message "+mdoc.data.message[0])
			this.list.unshift(mdoc.data.message[0])
			console.log(this.list)
            //store.commit("addcomment",cdoc.data.message[0])
         });
      });

    },
    methods:{
        send(){
			var d = new Date()
            var obj = {
                text:this.message,
				userid:"37",
				time: d.getHours()+":"+d.getMinutes(),
				teamid:this.teamid
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

.chat {
	display: flex;
	flex-flow: row wrap;
	align-items: flex-start;
	margin-bottom: 10px;
}


.chat .user-photo {
	width: 60px;
	height: 60px;
	background: #ccc;
	border-radius: 50%;
}

.chat .chat-message {
	width: 80%;
	padding: 15px;
	margin: 5px 10px 0;
	border-radius: 10px;
	color: #fff;
	font-size: 20px;
}

.friend .chat-message {
	background: #1adda4;
}

.self .chat-message {
	background: #1ddced;
	order: -1;
}

.chat-form {
	margin-top: 20px;
	display: flex;
	align-items: flex-start;
}

.chat-form textarea {
	background: #fbfbfb;
	width: 75%;
	height: 50px;
	border: 2px solid #eee;
	border-radius: 3px;
	resize: none;
	padding: 10px;
	font-size: 18px;
	color: #333;
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
