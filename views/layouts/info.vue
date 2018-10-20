<template>
<div>
      <input class="newnote"
            autofocus autocomplete="off"
            placeholder="Enter New Note title"
            v-model="newtitle">
      <button type="button" @click="addNote" class="btn btn-primary" >New</button>
      <ul>
        <li v-for="item in menulist"
            class="todo"
            :key="item">
            
            <div class="view">
              <a @dblclick="editTodo(todo)">{{ item.list_text }}</a>
              <button class="destroy" @click="removeTodo(item)"></button>
            </div>
            <input class="edit" type="text"
              v-model="item.list_text"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)">
        </li>
      </ul>

      {{menulist}}
</div>
</template>

<script>

import axios from 'axios'
import Hash from "../../lib/hash"
export default {
  data: function() {
    return {
      menuItems: "wdwd",
      newtitle:""
    };
  },
  computed:{
      menulist(){
        return this.$store.getters.menulist
      }
  },
  created: function(){ 
    
     console.log("!!!!!Vue menu List!!!!!!")
     this.$store.dispatch('setmenulist', '16') 
     console.log(this.menulist)

  },
  methods: {
    addNote(){
      var obj = {
        list_text:this.newtitle,
        note: "",
        list_num: menulist.length+1
      }
      this.newtitle = ""
      this.$store.dispatch("addmenulist",obj)    
    },
    doneEdit(){

    },
    cancelEdit(){

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