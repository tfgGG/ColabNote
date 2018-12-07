<template>
<div>
      <div class="title">
        <h2 class="ui header">
          <div class="content" style="width:100%"> 
              <div style="margin:10px; ">
                 {{noteinfo.title}}
                 <a class="ui gray label"> {{noteinfo.field}}</a>
                 <button class="ui icon button right floated" onclick="$('.ui.modal').modal('show');"><i class="columns icon"></i></button>
              </div>
              <div class="sub header" style="margin:10px; ">{{noteinfo.intro}}</div>
          </div>
        </h2>
      </div>

      <div class="ui mini modal">
        <div class="ui blue header">Add to Group</div>
        <div class="content">
          
              <div class="field">
                <label>Group:</label>
                <select class="group ui dropdown" name = "group" v-model="selected">
                      <option v-for="item in group" :key="item.idgroup" class="item" v-bind:value="item.idgroup">{{item.name}}</option>
                </select>
                <button class="timy ui basic blue button" @click="addgroup()">Add </button>
              </div>
              <div :key="a"  class="ui message" :class="{ negative: groupmessage.status == false, positive: groupmessage.status == true, none: groupmessage=='default'} " >
                 {{groupmessage.message}}
              </div>
         
        </div>
      </div>

</div>
</template>
<script>
import $ from 'jquery'
export default {
  props:['ids'],
  data: function() { 
    return {
        ids: this.ids,
        selected:''
    }
  },
  computed:{
    noteinfo(){
      return this.$store.state.noteinfo
    },
    field(){
      return this.$store.state.field
    },
    group(){
      return this.$store.state.group
    },
    user(){
      return this.$store.state.user
    },
    groupmessage(){
      return this.$store.state.groupmessage
     }
  },
  created:function(){

    this.$store.dispatch("getnoteinfo",this.ids[0])
    //this.$store.dispatch("getgroup")
   
    
  },
  mounted:function(){

      const store = this.$store
      $('.group').change(()=>{
         console.log("Inside detect")
         console.log($( ".group" ).val())
      })
  },
  methods:{

    addgroup(){
      if($( ".group" ).val() == '')
      {
        return;
      }
      var team = this.selected
      this.$store.dispatch("groupnote",{'note': this.ids[0],'group': $( ".group" ).val()})
    }

  }
 
};
</script>

<style scoped>
/* 樣式也可以包進來 ._. */
.original-white {
  color: #fff;
}

.none{
  display: none;
}

.title{
    /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    border-left: 5px solid #326fd1;
}
[v-cloak] { display: none; }

</style>