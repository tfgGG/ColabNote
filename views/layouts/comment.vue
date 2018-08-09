<template>
<div>
    <div v-for="item in menuItems">
        <div id='comment'>
        <div id="user">{{item}}</div>
        <div id="text">text</div>
        <div id="time">time</div>
        </div>
         <input type="button" value="Send" v-on:click="send">
    </div>
</div>
</template>

<script>
//var socket = require('socket.io-client')('http://localhost:3000');
var db = require("../../lib/getdata");

export default {
  data: function() {
    return {
      menuItems: db.getuser()
    };
  },
  methods: {
    send: function() {
      //db.postcomment();
      console.log("send");
    }
  }
};
</script>

<style>
/* 樣式也可以包進來 ._. */
.original-white {
  color: #fff;
}
</style>