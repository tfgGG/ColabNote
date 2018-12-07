<template>
<div>
    <div class="ui grid" style="height:95%; overflow-y:scroll;">
			<div class="sixteen wide column">
				<div class="ui comments" style="width:100%;">
					<div v-for="(item,index) in list" 
						:key="index" 
						class="comment"
						:class="{ friend: user.id != item.userid , self: item.userid == user.id }">
						<div class="content">
							<a class="avatar" id='user-photo'>
								<img  v-bind:src='item.img'>
							</a>
							<a class="author" id="username">{{item.username}}</a>
							<div class="metadata" id='time'>
								<span class="data">{{item.time}}</span>
							</div>
							<div class="text" id='dialog'>{{item.text}}</div>
						</div>
					</div>	
					<br>
				</div>		
			</div>		
    </div>
	<div class="ui bottom attached ">
		<div class="ui block segment">
					<input type="text" v-model="message" width="50%">
					<button @click="send" >Send</button>
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


#dialog {
	height: 100%;
	border-radius: 5px;
	color: #fff;
	font-weight: bold;
	font-size: 16px;
}

.friend .text {
	background: #1adda4;
	width: 60%;
}
.self .text {
	background:#1ddced;
}

.self .content {
	margin-left: 50%;
}

.self #user-photo{
	display: none;
}

.self #username{
	display: none;
}
.self #time{
	margin-left: 80%;
	/*display: none;*/
}


</style>
