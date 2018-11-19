<template>
<div>
    <div class="ui grid chat">
        <div class="chatbox">
		<div class="chatlogs">
		    <div v-for="(item,index) in list" 
                :key="index" 
                :class="{chat: true, friend: item.user != user , self: item.user == user}">
                <p class="chat-message">{{item.message}}</p>	
            </div>
			<div class="chat friend">
				<div class="user-photo"></div>
				<p class="chat-message">What's up, Brother ..!!</p>	
			</div>
			<div class="chat friend">
				<div class="user-photo"></div>
				<p class="chat-message">What's up, Brother ..!!</p>	
			</div>
			<div class="chat self">
				<div class="user-photo"></div>
				<p class="chat-message">What's up ..!!</p>	
			</div>
			<div class="chat self">
				<div class="user-photo"></div>
				<p class="chat-message">A única área que eu acho, que vai exigir muita atenção nossa, e aí eu já aventei a hipótese de até criar um ministério. É na área de... Na área... Eu diria assim, como uma espécie de analogia com o que acontece na área agrícola.</p>	
			</div>
			<div class="chat friend">
				<div class="user-photo"></div>
				<p class="chat-message">No meu xinélo da humildade eu gostaria muito de ver o Neymar e o Ganso. Por que eu acho que.... 11 entre 10 brasileiros gostariam. Você veja, eu já vi, parei de ver. Voltei a ver, e acho que o Neymar e o Ganso têm essa capacidade de fazer a gente olhar.

				Todos as descrições das pessoas são sobre a humanidade do atendimento, a pessoa pega no pulso, examina, olha com carinho. Então eu acho que vai ter outra coisa, que os médicos cubanos trouxeram pro brasil, um alto grau de humanidade.
				</p>	
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
import ShareDB from 'sharedb/lib/client';
var socket = new WebSocket('ws://localhost:3000');
var connection = new ShareDB.Connection(socket);
var mdoc;
export default {
    data(){
        return{
            list:[],
            message:"",
            status:0, // someone else push the comment
        } 
    },
    mounted:function(){

      mdoc = connection.get("message",'h');
      //console.log(mdoc.data.message)
      var scolist = this.list
      //const store = this.$store;
      mdoc.subscribe((err)=>{
           if (err) throw err;

        mdoc.on('op',(op)=>{
            console.log("Hi")
            console.log(mdoc.data.message[0])
            this.list.unshift(mdoc.data.message[0])
            //store.commit("addcomment",cdoc.data.message[0])
         });
      });

    },
    methods:{
        send(){
            var obj = {
                message:this.message,
                user:"yyu",
            }
            this.message=''
			//this.$store.dispatch("savemessage",obj)
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
