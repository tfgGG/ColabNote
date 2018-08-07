<template>
    <div v-for=()>
	<div id='comment'>
    <div id="user"></div>
    <div id="text"></div>
    <div id="time"></div>
    </div>
</div>
</template>

<script>
var socket = require('socket.io-client')('http://localhost:3000');
import db from './lib/getdata'


export default {
	data: function() {
		return {
			menuItems : db.getuser()
       }
   },
   send: function(){
       db.postcomment()
       
   }
}
</script>

<style>
/* 樣式也可以包進來 ._. */
.original-white {
	color: #fff;
}
</style>