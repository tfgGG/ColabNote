<template>
<div>
    <div clas="ui segment" style=" display:inline-block; height:100%;">
      <h3 class="ui block center aligned header" style="color:white; background-color: #3C8BDA;">Comment Area</h3>
      <div class="ui grid centered" style="overflow-y:scroll; height:85%;">
          <div class="sixteen wide column">
            <div class="ui comments">
              <div class="comment" :key="item" v-for="item in commentlist">
                <a class="avatar" href="#">
                    <img class="avatar" v-bind:src="item.img" alt="avatar">
                </a>
                <div class="content" href="#">
                      <a class="author">{{item.username}}</a>
                      <div class="metadata">
                        <div class="date">2 days ago</div>
                      </div>
                      <div class="text">
                          {{item.message}}
                      </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <h4 class="ui bottom attached  block header">
          <div class="ui input">
          <input type="text" v-model="comment" id="comment"><!--comment area-->
          </div>
          <button type="button" class='ui basic button' v-on:click="send">Send</button>
      </h4>
    </div>
</div>
</template>

<script>

import ShareDB from 'sharedb/lib/client';
import axios from 'axios'
var socket = new WebSocket('ws://'+location.hostname+":"+location.port);
var connection = new ShareDB.Connection(socket);
var cdoc;
export default {
  props:["ids"],
  data() {
    return {
      comment:"",
      ids: "",
      detail:[],
      old:{}
    };
  },
  computed:{
    commentlist(){
      return this.$store.state.commentlist
    },
    user(){
      return this.$store.state.user
    },
  },
  created(){
    this.fetchdata()
  },
  mounted: function(){

      cdoc = connection.get("comment",this.ids[0]);

      const store = this.$store;
      cdoc.subscribe(function(err){
           if (err) throw err;

        cdoc.on('op',(op)=>{
           // console.log(op)
            console.log(cdoc.data.comment)
            store.commit("addcomment",cdoc.data.comment[0])
         });
      });
      
  },
  methods: {
    send: function() {
      const d = new Date();
      console.log("Time" + d.toLocaleTimeString())
      const comment=[];
      const obj = {
        note: this.ids[0],
        user: this.user.id,
        message: this.comment,
        username: this.user.username,
        img: 'http://140.136.150.93/media/'+this.user.first_name
      }
      
      console.log("send out");
      cdoc.submitOp([{p: ['comment','0'], li:obj}]);
      //cdoc.submitOp([{p:['comment','key'], oi:obj}]);      
      //this.old = obj
      //console.log(cdoc.data.comment)
      this.$store.dispatch("addcomment",obj);
     
      
    },
    fetchdata: function(){
       this.$store.dispatch("setcomment",this.ids[0])
       this.$store.dispatch("GetUser",document.cookie)
       
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