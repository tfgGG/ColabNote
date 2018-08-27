<template>
<div>
    <div>
       <div class="card">
          <div class="card-body">
            <div class="pull-left image" href="#">
                <img class="avatar img-circle" src="http://localhost:8000/media/user1.jpg" alt="avatar">
            </div>
            <div class="comment-heading">
                  <h4 class="user">{{user.name}}</h4>
            </div>
            <input type="text" v-model="comment" id="comment"><!--comment area-->
            <input type="button" value="Send" class='btn' v-on:click="send">
          </div>
      </div>
    </div>
    <div id="list">
      <div class="card" v-for="item in commentlist">
          <div class="card-body ">
            <div class="pull-left" href="#">
                <img class="avatar img-circle" :src="item.photo" alt="avatar">
            </div>
            <div class="comment-heading">
                  <h4 class="user">{{item.user}}</h4>
                  <h5 class="time">{{item.date}}</h5>
            </div>
            <p>{{item.comment}}</p>
          </div>
      </div>
    </div>
</div>
</template>

<script>
import {commentdoc} from '../../public/js/client'

export default {
  data() {
    return {
      comment:"",
    };
  },
  computed:{
    commentlist(){
      return this.$store.state.commentlist
    },
    user(){
      return this.$store.state.user
    }
  },
  mounted: function(){

      /*
      commentdoc.subscribe(function(err){

          if (err) throw err;
          commentdoc.on('op',function(op){
            console.log(op);
          });
      });*/
  },
  methods: {
    send: function() {
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
.image{
  display: inline;
}
 .comment-heading {
  display: block;
  width: 100%;
}
 .comment-heading .user {
  font-size: 14px;
  font-weight: bold;
  display: inline;
  margin-top: 0;
  margin-right: 10px;
}
 .comment-heading .time {
  font-size: 12px;
  color: #aaa;
  margin-top: 0;
  display: inline;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
  margin-right: 15px;
}
</style>