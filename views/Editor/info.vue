<template>
<div>
      <!--<section class="main" v-show="menulist.length" v-cloak>-->
      <div class="ui vertical menu">
        <div class="item">
          <input class="newnote ui input"
                autofocus autocomplete="off"
                placeholder="Enter New Note title"
                v-model="newtitle">
          <button type="button" @click="addNote" class="ui fluid button" >New</button>
        </div>
        <div v-for="(item,index) in menulist"
            class="item"
            :key="item.idnote_list"
            :class="{editing: item == editeditem, currents: item.idnote_list == ids[1] , not:item.idnote_list != ids[1]}">

            <div class="view content" :class="{}">
              <label v-on:dblclick="editNote(item)" > 
                {{index + 1}}. {{ item.list_text }} 
              </label>
                <button class="mini ui basic icon button" v-on:click="changepage( item.noteid,item.idnote_list)">
                  <i class="angle right icon"></i>
                </button> 
              <!--<button class="destroy" @click="removeNote(item)"></button>-->
            </div>
            <div class="edit content">
              <input type="text"
                style="width:90%;"
                v-model="item.list_text"
                v-todo-focus="item == editeditem"
                @blur="doneEdit(item)"
                @keyup.enter="doneEdit(item)"
                @keyup.esc="cancelEdit(item)">
            </div>


        </div>
      </div>
      <!--</section>-->
      <!--{{menulist}}-->
     
</div>
</template>

<script>
var hash = require("../../lib/hash.js")
import $ from 'jquery'
export default {
  props:['ids','mode'],
  data: function() {
    return {
      newtitle:"",
      editeditem:"",
      ids:"",
      currents:null,
      mode:this.mode[0],
    }
  },
  computed:{
      menulist(){
        return this.$store.getters.menulist
      }

  },
  created: function(){ 
    
     this.$store.dispatch('setmenulist', this.ids[0] )
      this.$store.commit("setnoteid",this.ids)
  },
  methods:{
    changepage(noteid,id){
        
        if(this.mode == 'frame'){
        document.location.href = 'http://'+ document.location.hostname+":"+location.port + '/note/'+ noteid + "/" + id+ "?p=frame"
        }
        else{
        document.location.href = 'http://'+ document.location.hostname+":"+location.port + '/note/'+ noteid + "/" + id
        }
    },
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
      this.$store.dispatch("changetitle",item)
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

<style scoped>
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

li{
  list-style-type: none;
}
.currents{

    color: black;
    font-weight: bolder;
    font-size: 18px;
}
.currents .view{
    border-right: 3px solid #787C7D;
}
.not{
  color: #787F80;
  font-weight: bold;
  font-size: 16px;
}
</style>