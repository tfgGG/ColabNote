<template>
<div>
      <input class="newnote"
            autofocus autocomplete="off"
            placeholder="Enter New Note title"
            v-model="newtitle">
      <button type="button" @click="addNote" class="btn btn-primary" >New</button>
      <section class="main" v-show="menulist.length" v-cloak>
      <ul>
        <li v-for="item in menulist"
            class="item"
            :key="item.idnote_list"
            :class="{ editing: item == editeditem }">
            
            <div class="view">
              <a v-on:dblclick="editNote(item)" 
                 v-bind:href="'http://localhost:3000/note/' + item.noteid + '/'+ item.idnote_list">
                 {{ item.list_text }}
              </a>
              <!--<button class="destroy" @click="removeNote(item)"></button>-->
            </div>
            <input class="edit" type="text"
              v-model="item.list_text"
              v-todo-focus="item == editeditem"
              @blur="doneEdit(item)"
              @keyup.enter="doneEdit(item)"
              @keyup.esc="cancelEdit(item)">
        </li>
      </ul>
      </section>

      {{menulist}}
</div>
</template>

<script>
var hash = require("../../lib/hash.js")
export default {
  props:['ids'],
  data: function() {
    return {
      newtitle:"",
      editeditem:"",
      ids:""
    }
  },
  computed:{
      menulist(){
        return this.$store.getters.menulist
      }
  },
  created: function(){ 
    
     console.log("!!!!!Vue menu List!!!!!!")
     this.$store.dispatch('setmenulist', this.ids[0] )
     //console.log("result of decode"+hash.dec("QbYKez"))
    
  },
  methods: {
    addNote(){
      var obj = {
        list_text:this.newtitle,
        note: "",
        list_num: this.menulist.length+1,
        noteid: hash.dec(this.ids[0])
      }
      this.newtitle = ""
      this.$store.dispatch("addmenulist",obj)    
    },
    doneEdit(item){
      if (!this.editeditem) {
        return
      }
      this.editeditem = null
      if (!item.list_text) {
        item.list_text="Edit Here"
      }
      this.$store.dispatch("changetitle",item.list_text)
    },
    cancelEdit(){

    },
    editNote(item){
      console.log("editNOte")
      this.editeditem = item
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
};
</script>

<style>
/* 樣式也可以包進來 ._. */
.original-white {
  color: #fff;
}
[v-cloak] { display: none; }

.editing .view {
    display: none;
}
.edit{
  display: none;
}
.editing .edit{
    display: block;
}
</style>