<template>
<div>
      <div class="ui basic segment">
        <div class="ui left floated header">
            <h3 class="ui header">
                {{noteinfo.title}}
                 <div class="ui blue icon button right floated" onclick="$('.ui.modal').modal('show');"><i class="columns icon"></i></div>
            </h3>
            <div class="sub header">{{noteinfo.intro}}</div>
            <div class="sub header "><a class="ui gray label">{{noteinfo.field}}</a></div>
           <!-- <div class="sub header"><a  :key="f" v-for="f in field" class="ui gray label">#{{f.text}}</a></div>-->
        </div>

      </div>
      <div class="ui mini modal">
        <div class="ui blue header">Add to Planner</div>
        <div class="content">
          
              <div class="field">
                <label>Group:</label>
                <select class="ui dropdown group" name = "group" v-model="selected">
                      <option v-for="item in group" :key="item.idgroup" class="item" v-bind:value="item.idgroup">{{item.name}}</option>
                </select>
                <button @click="addgroup()">Add to group</button>
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
    plan(){
       return this.$store.state.plan
    }
  },
  created:function(){


    this.$store.dispatch("getnoteinfo",this.ids[0])
    this.$store.dispatch("getgroup")
   
    
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
      var team = this.selected
      this.$store.dispatch("groupnote",{'permission':team, 'noteid': this.ids[0]})
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

</style>