<template>
<div>
       <div class="ui comments">
          <div class="comment">
            <a class="avatar" href="#">
                <img class="avatar" src="http://localhost:8000/media/user1.jpg" alt="avatar">
            </a>
            <div class="content">
                  <a class="author">{{ username }}</a>
                  <div class="metadata">
                  </div>
                  <div class="text">
                      <input type="text" v-model="comment" id="comment"><!--comment area-->
                      <button type="button" class='ui basic button' v-on:click="send">Send</button>
                  </div>
            </div>
          </div>
          <div class="comment" :key="item" v-for="item in commentlist" style="margin-right:0px;">
            <a class="avatar" href="#">
                <img class="avatar" src="http://localhost:8000/media/user1.jpg" alt="avatar">
            </a>
            <div class="content" href="#">
                  <a class="author">{{item.username}}</a>
                  <div class="metadata">
                    <div class="date">2 days ago</div>
                    <div class="rating">
                      <i class="star icon"></i>
                      5 Faves
                    </div>
                  </div>
                   <div class="text">
                      {{item.message}}
                  </div>
            </div>
          </div>
      </div>
</div>
</template>

<script>

import ShareDB from 'sharedb/lib/client';
import axios from 'axios'
var socket = new WebSocket('ws://localhost:3000');
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
    username(){
      return this.$store.state.username 
    }
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
        user: this.user.user,
        message: this.comment,
        username:this.username
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